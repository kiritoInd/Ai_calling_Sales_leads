const EventEmitter = require('events');
const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

class TextToSpeechService extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.apiKey = process.env.FISH_AUDIO_API_KEY; // Fish Audio API key
    this.nextExpectedIndex = 0;
    this.speechBuffer = {};
  }

  async generate(gptReply, interactionCount) {
    const { partialResponseIndex, partialResponse } = gptReply;

    if (!partialResponse) {
      return;
    }

    try {
      // Prepare the request body based on the OpenAPI v1 specification
      const requestBody = {
        text: partialResponse,       // Text to convert to speech
        format: 'wav',               // Audio format (we will convert this later to ulaw_8000)
        chunk_length: 200,           // Optional: Define chunk length (default is 200)
        normalize: true,             // Optional: Normalize speech to reduce latency
      };

      // Send a request to Fish Audio API for TTS
      const response = await axios.post(
        `https://api.fish.audio/v1/tts`,  // Correct endpoint based on OpenAPI spec
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,  // Bearer token for authentication
            'Content-Type': 'application/json',        // Content-Type as JSON
            'Accept': 'audio/wav',                     // Expecting WAV audio response
          },
          responseType: 'arraybuffer' // Expect the response to be a binary stream (audio)
        }
      );

      // Handle the WAV audio buffer
      const audioArrayBuffer = Buffer.from(response.data, 'binary');
      const wavFilePath = './temp_audio.wav';
      const ulawFilePath = './output_audio.wav';  // Use .wav extension for ulaw format

      // Save the WAV file to disk
      fs.writeFileSync(wavFilePath, audioArrayBuffer);

      // Convert WAV to ulaw_8000 using ffmpeg, but save it with a .wav extension
      ffmpeg(wavFilePath)
        .audioCodec('pcm_mulaw')    // Use μ-law codec (G.711)
        .audioFrequency(8000)       // Set the frequency to 8000 Hz (telephony standard)
        .output(ulawFilePath)       // Output file should have .wav extension
        .on('end', () => {
          // Load the ulaw file back into memory (base64 or buffer)
          const ulawAudioBuffer = fs.readFileSync(ulawFilePath);
          const base64Audio = ulawAudioBuffer.toString('base64');

          // Emit the event with the ulaw_8000 audio in base64 format
          this.emit('speech', partialResponseIndex, base64Audio, partialResponse, interactionCount);

          // Clean up the temporary files
          fs.unlinkSync(wavFilePath);
          fs.unlinkSync(ulawFilePath);
        })
        .on('error', (err) => {
          console.error('Error during ffmpeg conversion:', err);
        })
        .run();

    } catch (err) {
      console.error('Error occurred in TextToSpeech service with Fish Audio API');
      console.error(err);
    }
  }
}

module.exports = { TextToSpeechService };
