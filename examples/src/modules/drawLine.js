function drawLine(canvas, a, b, style) {
  var context = canvas._context;
  Object.assign(context, style);
  if (style.lineDash) {
    context.setLineDash(style.lineDash);
  } else {
    context.setLineDash([0, 0]);
  }
  context.beginPath();
  context.moveTo(a.x, a.y);
  context.lineTo(b.x, b.y);
  context.stroke();
}

module.exports = drawLine;
