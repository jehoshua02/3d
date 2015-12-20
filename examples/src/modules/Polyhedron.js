var VectorList = require('src/VectorList');

function Polyhedron(faces) {
  Object.defineProperties(this, {
    faces: {get: function () {return faces}}
  });
}

Polyhedron.prototype.multiply = function (factor) {
  return new Polyhedron(this.faces.map(function (face) {return face.multiply(factor)}));
}

Polyhedron.prototype.add = function (vector) {
  return new Polyhedron(this.faces.map(function (face) {return face.add(vector)}));
}

Polyhedron.prototype.subtract = function (vector) {
  return new Polyhedron(this.faces.map(function (face) {return face.subtract(vector)}));
}

Polyhedron.prototype.rotate = function (x, y, z) {
  return new Polyhedron(this.faces.map(function (face) {return face.rotate(x, y, z)}));
}

Polyhedron.prototype.project = function (width, height) {
  return new Polyhedron(this.faces.map(function (face) {
    return new VectorList(face.vectors.map(function (vector) {
      return vector.project(width, height);
    }));
  }));
}

module.exports = Polyhedron;
