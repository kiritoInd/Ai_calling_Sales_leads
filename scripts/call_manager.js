
const makeOutboundCall = require('./outbound-call'); 

const numbersToCall = ['+919599932057', '+919810880124']; 
let currentCallIndex = 0;

const getCurrentNumber = () => numbersToCall[currentCallIndex];

if (numbersToCall.length > 0) {
  makeOutboundCall(numbersToCall[currentCallIndex], () => {
    
  });
  console.log(currentCallIndex);
}


module.exports = { getCurrentNumber };