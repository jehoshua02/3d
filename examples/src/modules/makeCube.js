var Polyhedron = require('modules/Polyhedron');
var Vector = require('src/Vector');
var VectorList = require('src/VectorList');

module.exports = function makeCube() {
  var vectors = [
    new Vector(-1, -1, -1),
    new Vector(1, -1, -1),
    new Vector(1, 1, -1),
    new Vector(-1, 1, -1),
    new Vector(-1, -1, 1),
    new Vector(1, -1, 1),
    new Vector(1, 1, 1),
    new Vector(-1, 1, 1),
  ];

  var faces = [
    [0, 1, 2, 3],
    [1, 5, 6, 2],
    [5, 4, 7, 6],
    [4, 0, 3, 7],
    [0, 1, 5, 4],
    [3, 2, 6, 7],
  ];

  return new Polyhedron(faces.map(function (face) {
    return new VectorList(face.map(function (i) {return vectors[i]}));
  }));
}
