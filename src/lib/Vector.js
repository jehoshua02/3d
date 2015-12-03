var Trig = require('lib/Trigonometry');

/**
 * Represents a Vector in 3 Dimensions.
 *
 * Vectors are immutable. Methods always return a new Vector rather than
 * manipulating current Vector.
 *
 * 3D coordinate system is considered "right-handed".
 *
 * @param {Number} x Distance on the x-axis.
 * @param {Number} y Distance on the y-axis.
 * @param {Number} z Distance on the z-axis.
 * @return {Vector}
 */
function Vector(x, y, z) {
  Object.defineProperties(this, {
    x: {get: function () {return x}},
    y: {get: function () {return y}},
    z: {get: function () {return z}},
  });
}

/**
 * Returns string representation of a Vector.
 *
 * @return {String} Returns string like `'{x: x, y: y, z: z}'`.
 */
Vector.prototype.toString = function () {
  return JSON.stringify({
    x: this.x,
    y: this.y,
    z: this.z
  });
}

/**
 * Returns array representation of a Vector.
 *
 * @return {Array} Returns array like `[x, y, z]`.
 */
Vector.prototype.toArray = function () {
  return [this.x, this.y, this.z];
}

/**
 * Returns the sum of two Vectors.
 *
 * Useful for positioning Vector relative to another Vector after transformation.
 *
 * @param {Vector} that Vector to add into this Vector. Corresponding coordinates are added together.
 * @return {Vector}
 */
Vector.prototype.add = function (that) {
  return new Vector(
    this.x + that.x,
    this.y + that.y,
    this.z + that.z
  );
}

/**
 * Returns the difference of two Vectors.
 *
 * Useful for positioning Vector relative to origin 0,0,0 before transformation.
 *
 * @param  {Vector} that Vector to subtract from this Vector. Corresponding coordinates are subtracted.
 * @return {Vector}
 */
Vector.prototype.subtract = function (that) {
  return new Vector(
    this.x - that.x,
    this.y - that.y,
    this.z - that.z
  );
}

/**
 * Multiplies a Vector.
 *
 * @param  {Number} factor Factor by which each coordinate will be multiplied.
 * @return {Vector}
 */
Vector.prototype.multiply = function (factor) {
  return new Vector(
    this.x * factor,
    this.y * factor,
    this.z * factor
  );
}

/**
 * Divides a Vector.
 *
 * @param  {Number} divisor Number by which all coordinates will be divided.
 * @return {Vector}
 */
Vector.prototype.divide = function (divisor) {
  return new Vector(
    this.x / divisor,
    this.y / divisor,
    this.z / divisor
  );
}

/**
 * Finds distance between two Vectors.
 *
 * @param  {Vector} that The other Vector.
 * @return {Number}
 */
Vector.prototype.distance = function (that) {
  that = that.subtract(this);
  var hypotenuse = Trig.findHypotenuseGivenAdjacentAndOpposite;
  return hypotenuse(hypotenuse(that.x, that.z), that.y);
}

/**
 * Shifts the Vector axis such that z becomes x, x becomes y, y becomes z.
 *
 * Used internally, before or after 3D rotations, to normalize rotation to the
 * x-y plane for 2D rotation.
 *
 * @return {Vector}
 */
Vector.prototype.axisShift = function () {
  return new Vector(this.z, this.x, this.y);
}

/**
 * Unshifts the Vector axis such that x becomes z, y becomes x, z becomes y. The
 * opposite of `Vector.prototype.axisShift`.
 *
 * Used internally, before or after 3D rotations, to normalize rotation to the
 * x-y plane for 2D rotation.
 *
 * @return {Vector}
 */
Vector.prototype.axisUnshift = function () {
  return new Vector(this.y, this.z, this.x);
}

/**
 * Rotates Vector around z axis, or on xy plane, around it's origin (0,0,0).
 *
 * The x and y coordinates change while the z coordinate remains the same.
 *
 * @param  {Number} radians Angle of rotation in radians. Looking down the z
 * axis, at the xy plane, a positive value results in counter-clockwise rotation.
 * @return {Vector}
 */
Vector.prototype.rotateZ = function (radians) {
  var cosa = Math.cos(radians);
  var sina = Math.sin(radians);
  return new Vector(
    this.x * cosa - this.y * sina,
    this.x * sina + this.y * cosa,
    this.z
  );
}

/**
 * Rotates Vector around y axis, or on zx plane, around it's origin (0,0,0).
 *
 * The z and x coordinates change while the y coordinate remains the same.
 *
 * @param  {Number} radians Angle of rotation in radians. Looking down the y
 * axis, at the zx plane, a positive value results in counter-clockwise rotation.
 * @return {Vector}
 */
Vector.prototype.rotateY = function (radians) {
  return this.axisShift().rotateZ(radians).axisUnshift();
}

/**
 * Rotates Vector around x axis, or on yz plane, around it's origin (0,0,0).
 *
 * The y and z coordinates change while the x coordinate remains the same.
 *
 * @param  {Number} radians Angle of rotation in radians. Looking down the x
 * axis, at the yz plane, a positive value results in counter-clockwise rotation.
 * @return {Vector}
 */
Vector.prototype.rotateX = function (radians) {
  return this.axisUnshift().rotateZ(radians).axisShift();
}

/**
 * Combines x, y, z rotations.
 *
 * Simply chains together `rotateX`, then `rotateY`, then `rotateZ`.
 *
 * @param  {Number} x Angle of the x rotation in radians.
 * @param  {Number} y Angle of the y rotation in radians.
 * @param  {Number} z Angle of the z rotation in radians.
 * @return {Vector}
 */
Vector.prototype.rotate = function (x, y, z) {
  return this.rotateX(x).rotateY(y).rotateZ(z);
}

module.exports = Vector;
