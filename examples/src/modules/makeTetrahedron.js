var Polyhedron = require('modules/Polyhedron');
var Vector = require('src/Vector');
var makeRegularPolygon = require('modules/makeRegularPolygon');
var Trig = require('src/Trigonometry');

module.exports = function makeTetrahedron() {
  var deg = Trig.degreesToRadians;
  var faces = [];

  for (var i = 0; i < 3; i++) {
    var face = makeRegularPolygon(3);
    var angle = Math.asin(Math.sin(deg(30)) / (1 + Math.sin(deg(30))));
    var face = makeRegularPolygon(3);
    var o = face.vectors[0];
    faces.push(
      face.subtract(o)
      .rotate(angle, deg(360 / 3) * i, 0)
      .add(o)
    );
  }

  var face = makeRegularPolygon(3);
  var o = face.vectors[0];
  faces.push(
    face.subtract(o)
    .rotate(deg(90), 0, 0)
    .add(faces[1].vectors[1])
  );

  return new Polyhedron(faces);
}
