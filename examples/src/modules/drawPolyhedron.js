var drawPolygon = require('modules/drawPolygon');

module.exports = function drawPolyhedron(canvas, faces, style) {
  var avgZ = function (vectors) {
    var z = vectors.map(function (v) {return v.z});
    var sum = z.reduce(function (sum, z) {return sum + z}, 0);
    return sum / z.length;
  }

  faces
  .map(function (face, i) {face.i = i; return face})
  .sort(function (a, b) {return avgZ(b.vectors) - avgZ(a.vectors)})
  .forEach(function (face) {
    drawPolygon(canvas, face.vectors, style[face.i]);
  });
}
