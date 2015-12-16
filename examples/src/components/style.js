var Color = require('color');

var color = {
  primary: 'hotpink',
  canvas: '#333'
}

module.exports = {
  color,
  canvas: {
    background: color.canvas,
    borderRadius: 3
  },
  cube: {
    0: {fillStyle: Color(color.primary).darken(0.0).rgbString()},
    1: {fillStyle: Color(color.primary).darken(0.1).rgbString()},
    2: {fillStyle: Color(color.primary).darken(0.2).rgbString()},
    3: {fillStyle: Color(color.primary).darken(0.3).rgbString()},
    4: {fillStyle: Color(color.primary).darken(0.4).rgbString()},
    5: {fillStyle: Color(color.primary).darken(0.5).rgbString()},
  }
}
