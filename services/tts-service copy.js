const EventEmitter = require('events');
const { createClient } = require('@deepgram/sdk');
const fs = require('fs');
const { pipeline } = require('stream/promises');

class TextToSpeechService extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.deepgram = createClient(process.env.DEEPGRAM_API_KEY); // Deepgram API key
  }

  async generate(gptReply, interactionCount) {
    const { partialResponseIndex, partialResponse } = gptReply;

    if (!partialResponse) {
      return;
    }

    try {
      // Send a request to Deepgram API for TTS
      const response = await this.deepgram.speak.request(
        { text: partialResponse },
        {
          model: 'aura-asteria-en',  // Use the appropriate Deepgram model
          encoding: 'linear16',      // Use linear PCM format (default)
          container: 'wav',          // Use WAV container for output
        }
      );

      // Get the audio stream from Deepgram
      const stream = await response.getStream();
      if (stream) {
        const wavFilePath = './temp_audio.wav';
        const ulawFilePath = './output_audio.wav'; // For μ-law format

        // Write the stream to a temporary WAV file
        const file = fs.createWriteStream(wavFilePath);
        await pipeline(stream, file);
        console.log(`Audio file written to ${wavFilePath}`);

        // Convert WAV to μ-law (ulaw_8000) using ffmpeg
        ffmpeg(wavFilePath)
          .audioCodec('pcm_mulaw')  // Use μ-law codec (G.711)
          .audioFrequency(8000)     // Set frequency to 8000 Hz
          .output(ulawFilePath)     // Output file should have .wav extension
          .on('end', () => {
            const ulawAudioBuffer = fs.readFileSync(ulawFilePath);
            const base64Audio = ulawAudioBuffer.toString('base64');

            // Emit the event with the μ-law audio in base64 format
            this.emit('speech', partialResponseIndex, base64Audio, partialResponse, interactionCount);

            // Clean up temporary files
            fs.unlinkSync(wavFilePath);
            fs.unlinkSync(ulawFilePath);
          })
          .on('error', (err) => {
            console.error('Error during ffmpeg conversion:', err);
          })
          .run();
      } else {
        console.error('Error generating audio: No stream returned.');
      }
    } catch (err) {
      console.error('Error occurred in TextToSpeech service with Deepgram API');
      console.error(err);
    }
  }
}

module.exports = { TextToSpeechService };
