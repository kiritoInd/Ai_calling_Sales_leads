const twilio = require('twilio');

// Initialize Twilio client with your Account SID and Auth Token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let callSid;

// Event emitter for receiving the call SID
const { getSid, sidemmiter } = require('../FunctonsNGPT/EmitSid');


sidemmiter.on('sidEmitted', (sid) => {
    callSid = sid;
    console.log('Call SID received:', callSid);
});

// Function to end the call
async function EndCall() {
    if (!callSid) {
        console.error('Call SID is not available.');
        return;
    }

    try {
        // Fetch and update the call status to 'completed'
        const call = await client.calls(callSid).update({ status: 'completed' });
        console.log(`Call with SID ${callSid} has been ended.`);
    } catch (error) {
        console.error('Error ending the call:', error);
    }

    return JSON.stringify({});
}

module.exports = EndCall;
