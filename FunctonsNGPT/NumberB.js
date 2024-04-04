const EventEmitter = require('events');
const numberEmitted = new EventEmitter();

function getNumberPhn(number){
    numberEmitted.emit('numberEmitted', number);
}

numberEmitted.on('numberEmitted', (number) => {
    console.log('Number emitted:', number);
});

module.exports = { getNumberPhn, numberEmitted };