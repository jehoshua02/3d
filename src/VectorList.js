/**
 * Represents a list of Vectors.
 *
 * Useful for describing a Polygon.
 *
 * @param {Array} vectors Array of Vector.
 * @return {VectorList}
 */
function VectorList(vectors) {
  Object.defineProperties(this, {
    vectors: {get: function () {return vectors.slice()}}
  });
}

/**
 * Returns array of Vectors in array form.
 *
 * @return {Array} An array of Vector array.
 */
VectorList.prototype.toArray = function () {
  return this.vectors.map(function (v) {return v.toArray()});
}

/**
 * Returns array of Vectors in object literal form.
 *
 * @return {Array} An array of Vector object literals.
 */
VectorList.prototype.toObject = function () {
  return this.vectors.map(function (v) {return v.toObject()});
}

/**
 * Returns JSON representation of VectorList.
 *
 * @return {String}
 */
VectorList.prototype.toJSON = function () {
  return JSON.stringify(
    this.vectors.map(function (v) {return v.toObject()})
  );
}

/**
 * Multiplies each Vector by factor and returns new VectorList.
 *
 * @param  {Number} factor Factor by which to multiply each Vector.
 * @return {VectorList}
 */
VectorList.prototype.multiply = function (factor) {
  var vectors = this.vectors.map(function (v) {return v.multiply(factor)});
  return new VectorList(vectors);
}

/**
 * Adds a Vector to each Vector and returns new VectorList.
 *
 * @param {Vector} vector Vector to add into each Vector.
 * @return {VectorList}
 */
VectorList.prototype.add = function (vector) {
  var vectors = this.vectors.map(function (v) {return v.add(vector)});
  return new VectorList(vectors);
}

VectorList.prototype.rotate = function (x, y, z) {
  var vectors = this.vectors.map(function (v) {
    return v.rotate(x, y, z);
  });
  return new VectorList(vectors);
}

module.exports = VectorList;
