// outbound-call.js
require('dotenv').config();
const getNumberPhn = require('./NumberB');
async function makeOutboundCall(number, onCallCompleted) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  getNumberPhn.getNumberPhn(number);
  client.calls.create({
    url: `https://${process.env.SERVER}/incoming`,
    to: number,
    from: process.env.FROM_NUMBER,
    statusCallback: `https://${process.env.SERVER}/statusCallback`,
    statusCallbackMethod: 'POST',
    statusCallbackEvent: ['completed']
  })
  .then(call => {
    console.log(`Call initiated to ${number} with SID: ${call.sid}`);
  })
  .catch(error => {
    console.error(`Failed to call ${number}:`, error);
  });

  // The actual invocation of the callback will be handled in the status callback endpoint in app.js
}

module.exports = makeOutboundCall;