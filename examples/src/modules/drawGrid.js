var Vector = require('src/Vector');
var drawLine = require('./drawLine');

function drawGrid(canvas, spacing, style) {
  var center = canvas.center;
  spacing = spacing + 1;

  for (var x = 0; x <= canvas.width; x += spacing) {
    drawLine(
      canvas,
      new Vector(center.x + x, center.y - spacing, 0),
      new Vector(center.x + x, 0, 0),
      style
    );
    drawLine(
      canvas,
      new Vector(center.x + x, center.y + spacing, 0),
      new Vector(center.x + x, canvas.height, 0),
      style
    );
    drawLine(
      canvas,
      new Vector(center.x - x, center.y - spacing, 0),
      new Vector(center.x - x, 0, 0),
      style
    );
    drawLine(
      canvas,
      new Vector(center.x - x, center.y + spacing, 0),
      new Vector(center.x - x, canvas.height, 0),
      style
    );
  }
}

module.exports = drawGrid;
