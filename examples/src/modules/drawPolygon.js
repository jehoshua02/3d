function drawPolygon(canvas, vectors, style) {
  var context = canvas._context;
  Object.assign(context, style);
  context.beginPath();
  vectors.forEach(function (v, i) {
    var method = (i === 0) ? 'moveTo' : 'lineTo';
    context[method](v.x, v.y);
  });
  context.closePath();
  context.fill();
}

module.exports = drawPolygon;
