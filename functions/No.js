require('dotenv').config();
const fs = require('fs');
const path = require('path');
let numbers = process.env.YOUR_NUMBER;

const { getNumberPhn, numberEmitted } = require('../FunctonsNGPT/NumberB');

numberEmitted.on('numberEmitted', (number) => {
    numbers = number;
});
async function No(lead) {
  const filePath = path.join(__dirname, 'leads.csv');

  const data = `${numbers},Negative\n`;

  fs.appendFile(filePath, data, (err) => {
      if (err) {
          console.error('Failed to mark negetive lead:', err);
      } else {
          console.log('Lead marked as Negetive:', numbers);
      }
  });

  return JSON.stringify({ });
}

module.exports = No;
