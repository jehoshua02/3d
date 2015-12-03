var Trig = require('lib/Trigonometry');

function Vector(x, y, z) {
  Object.defineProperties(this, {
    x: {get: function () {return x}},
    y: {get: function () {return y}},
    z: {get: function () {return z}},
  });
}

Vector.prototype.toString = function () {
  return JSON.stringify({
    x: this.x,
    y: this.y,
    z: this.z
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

Vector.prototype.axisShift = function () {
  return new Vector(this.z, this.x, this.y);
}

Vector.prototype.axisUnshift = function () {
  return new Vector(this.y, this.z, this.x);
}

Vector.prototype.rotateZ = function (radians) {
  return rotate2D(this, radians);
}

Vector.prototype.rotateY = function (radians) {
  return this.axisShift().rotateZ(radians).axisUnshift();
}

Vector.prototype.rotateX = function (radians) {
  return this.axisUnshift().rotateZ(radians).axisShift();
}

Vector.prototype.rotate = function (x, y, z) {
  return this.rotateX(x).rotate(y).rotate(z);
}

function rotate2D(v, radians) {
  var cosa = Math.cos(radians);
  var sina = Math.sin(radians);
  return new Vector(
    v.x * cosa - v.y * sina,
    v.x * sina + v.y * cosa,
    v.z
  );
}

module.exports = Vector;
