const EventEmitter = require('events');
const sidemmiter = new EventEmitter();

function getSid(sid) {
    if (typeof sid !== 'string') {
        throw new Error('sid must be a string');
    }
    sidemmiter.emit('sidEmitted', sid);
}

sidemmiter.on('sidEmitted', (sid) => {
    console.log('Sid emitted:', sid);
});

module.exports = { getSid, sidemmiter };