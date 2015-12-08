function VectorList(vectors) {
  Object.defineProperties(this, {
    vectors: {get: function () {return vectors.slice()}}
  });
}

// VectorList.prototype.map = function (fn) {
//   return new VectorList(this.vectors.map(fn));
// }

// VectorList.prototype.forEach = function (fn) {
//   this.vectors.forEach(fn);
// }

// VectorList.prototype.multiply = function (factor) {
//   return this.map(function (v) {return v.multiply(factor)});
// }

// VectorList.prototype.add = function (vector) {
//   return this.map(function (v) {return v.add(vector)});
// }

module.exports = VectorList;
