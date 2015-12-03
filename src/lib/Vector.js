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
  var cosa = Math.cos(radians);
  var sina = Math.sin(radians);
  return new Vector(
    this.x * cosa - this.y * sina,
    this.x * sina + this.y * cosa,
    this.z
  );
}

Vector.prototype.rotateY = function (radians) {
  return this.axisShift().rotateZ(radians).axisUnshift();
}

Vector.prototype.rotateX = function (radians) {
  return this.axisUnshift().rotateZ(radians).axisShift();
}

Vector.prototype.rotate = function (x, y, z) {
  return this.rotateX(x).rotateY(y).rotateZ(z);
}

module.exports = Vector;
