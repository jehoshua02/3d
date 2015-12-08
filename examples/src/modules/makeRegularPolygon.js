var Vector = require('src/Vector');
var VectorList = require('src/VectorList');
var Trig = require('src/Trigonometry');

function makeRegularPolygon(sides, radius) {
  var vectors = [];
  var a = 360 / sides;
  for (var i = 0; i < sides; i++) {
    var angle = Trig.degreesToRadians(a * i);
    vectors.push(new Vector(0, -1, 0).rotateZ(angle));
  }
  return new VectorList(vectors);
}

module.exports = makeRegularPolygon;
