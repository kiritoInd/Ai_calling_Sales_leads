require('dotenv').config();
const fs = require('fs');
const path = require('path');
let number = process.env.YOUR_NUMBER;

async function Intreseted(lead) {
  const filePath = path.join(__dirname, 'leads.csv');
  const data = `${number},Positive\n`;

  fs.appendFile(filePath, data, (err) => {
      if (err) {
          console.error('Failed to mark positive lead:', err);
      } else {
          console.log('Lead marked as positive:', number);
      }
  });

  return JSON.stringify({ });
}

module.exports = Intreseted;