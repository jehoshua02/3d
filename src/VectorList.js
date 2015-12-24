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
 * Multiplies each Vector by factor and returns new VectorList.
 *
 * @param  {Number} factor Factor by which to multiply each Vector.
 * @return {VectorList}
 */
VectorList.prototype.scale = function (x, y, z) {
  var vectors = this.vectors.map(function (v) {return v.scale(x, y, z)});
  return new VectorList(vectors);
}

/**
 * Adds a Vector to each Vector and returns new VectorList.
 *
 * @param {Vector} vector Vector to add into each Vector.
 * @return {VectorList}
 */
VectorList.prototype.translate = function (x, y, z) {
  var vectors = this.vectors.map(function (v) {return v.translate(x, y, z)});
  return new VectorList(vectors);
}

VectorList.prototype.rotate = function (x, y, z) {
  var vectors = this.vectors.map(function (v) {
    return v.rotate(x, y, z);
  });
  return new VectorList(vectors);
}

module.exports = VectorList;
