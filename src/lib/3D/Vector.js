var Trig = require('lib/Trigonometry');

function Vector(x, y, z) {
  Object.defineProperties(this, {
    x: {get: function () {return x}},
    y: {get: function () {return y}},
    z: {get: function () {return z}},
  });
}

Vector.prototype.toArray = function () {
  return [this.x, this.y, this.z];
}

Vector.prototype.add = function (that) {
  return new Vector(
    this.x + that.x,
    this.y + that.y,
    this.z + that.z
  );
}

Vector.prototype.subtract = function (that) {
  return new Vector(
    this.x - that.x,
    this.y - that.y,
    this.z - that.z
  );
}

Vector.prototype.multiply = function (factor) {
  return new Vector(
    this.x * factor,
    this.y * factor,
    this.z * factor
  );
}

Vector.prototype.divide = function (divisor) {
  return new Vector(
    this.x / divisor,
    this.y / divisor,
    this.z / divisor
  );
}

Vector.prototype.distance = function (that) {
  // Convert this 3D problem into 2-step 2D problem.
  // Using x and z as adjacent and opposite find hypotenuse.
  // Then use this hypotenuse and y to find hypotenuse, which is distance.
  // But first make this problem relative to [0,0,0].
  that = that.subtract(this);
  var hypotenuse = Trig.findHypotenuseGivenAdjacentAndOpposite;
  return hypotenuse(hypotenuse(that.x, that.z), that.y);
}

Vector.prototype.rotateZ = function (center, radians) {
  var v = this.subtract(center);
  var cosa = Math.cos(radians);
  var sina = Math.sin(radians);

  // s=o/h c=a/h t=o/a
  // console.log({
  //   'v.x * cosa': v.x * cosa,
  //   'v.y * sina': v.y * sina,
  //   'v.x * cosa - v.y * sina': v.x * cosa - v.y * sina,
  //   'v.x * sina': v.x * sina,
  //   'v.y * cosa': v.y * cosa,
  //   'v.x * sina + v.y * cosa': v.x * sina + v.y * cosa,
  // });

  var x = v.x * cosa - v.y * sina;
  var y = v.x * sina + v.y * cosa;
  var z = v.z;
  return new Vector(x, y, z).add(center);
}

module.exports = Vector;
