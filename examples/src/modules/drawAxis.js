var drawLine = require('modules/drawLine');

function drawAxis(canvas, axisStyle, ticksStyle) {
  // horizontal
  drawLine(canvas, canvas.centerTop, canvas.centerBottom, axisStyle);
  drawLine(canvas, canvas.center, canvas.centerTop, ticksStyle);
  drawLine(canvas, canvas.center, canvas.centerBottom, ticksStyle);

  // vertical
  drawLine(canvas, canvas.leftCenter, canvas.rightCenter, axisStyle);
  drawLine(canvas, canvas.center, canvas.leftCenter, ticksStyle);
  drawLine(canvas, canvas.center, canvas.rightCenter, ticksStyle);
}

module.exports = drawAxis;
