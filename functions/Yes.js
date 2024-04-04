require('dotenv').config();
const fs = require('fs');
const path = require('path');
let numbers = process.env.YOUR_NUMBER;

const { getNumberPhn, numberEmitted } = require('../FunctonsNGPT/NumberB');

numberEmitted.on('numberEmitted', (number) => {
    numbers = number;
});

async function Yes(lead) {
  const filePath = path.join(__dirname, 'leads.csv');
  const data = `${numbers},Positive\n`;

  fs.appendFile(filePath, data, (err) => {
      if (err) {
          console.error('Failed to mark positive lead:', err);
      } else {
          console.log('Lead marked as positive:', numbers);
      }
  });

  return JSON.stringify({ });
}

module.exports = Yes;