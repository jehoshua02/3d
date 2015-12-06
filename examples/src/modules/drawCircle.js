function drawCircle(canvas, center, radius, style) {
  var context = canvas._context;
  Object.assign(context, style);
  context.beginPath();
  context.moveTo(center.x, center.y);
  context.beginPath();
  context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  if (style.fillStyle) {
    context.fill();
  }
  if (style.strokeStyle) {
    context.stroke();
  }
}

module.exports = drawCircle;
