function VectorList(vectors) {
  Object.defineProperties(this, {
    vectors: {get: function () {return vectors.slice()}}
  });
}

VectorList.prototype.toArray = function () {
  return this.vectors.map(function (v) {return v.toArray()});
}

VectorList.prototype.toObject = function () {
  return this.vectors.map(function (v) {return v.toObject()});
}

VectorList.prototype.toJSON = function () {
  return JSON.stringify(
    this.vectors.map(function (v) {return v.toObject()})
  );
}

VectorList.prototype.multiply = function (factor) {
  var vectors = this.vectors.map(function (v) {return v.multiply(factor)});
  return new VectorList(vectors);
}

VectorList.prototype.add = function (vector) {
  var vectors = this.vectors.map(function (v) {return v.add(vector)});
  return new VectorList(vectors);
}

module.exports = VectorList;
