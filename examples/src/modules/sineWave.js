var Trig = require('src/Trigonometry');

function sineWave(amplitude, rate) {
  var now = new Date();
  var time = now.getSeconds() + now.getMilliseconds() / 1000;
  var frequency = Trig.degreesToRadians(rate);
  var phase = frequency * time;
  return Math.floor(amplitude * Math.sin(frequency * time + phase));
}

module.exports = sineWave;
