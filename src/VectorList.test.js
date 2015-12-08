var VectorList = require('./VectorList');
var Vector = require('./Vector');

describe('VectorList', function () {
  it('should expose read only vector list', function () {
    var list = new VectorList([new Vector(1, 0, 0)]);
    list.vectors.push(new Vector(0, 1, 0));
    var actual = list.vectors;
    expect(actual.map(function (v) {return v.toArray()})).to.eql([[1, 0, 0]]);
  });

  describe('toArray', function () {
    it('should return array of vector arrays', function () {
      var list = new VectorList([new Vector(0, 1, 0), new Vector(1, 0, 0)]);
      var actual = list.toArray();
      expect(actual).to.eql([[0, 1, 0], [1, 0, 0]]);
    });
  });

  describe('toObject', function () {
    it('should return array of object literals', function () {
      var list = new VectorList([new Vector(0, 1, 0), new Vector(1, 0, 0)]);
      var actual = list.toObject();
      expect(actual).to.eql([{x: 0, y: 1, z: 0}, {x: 1, y: 0, z: 0}]);
    })
  });

  describe('toJSON', function () {
    it('should return JSON string of vectors', function () {
      var list = new VectorList([new Vector(0, 1, 0), new Vector(1, 0, 0)]);
      var actual = list.toJSON();
      expect(actual).to.equal('[{"x":0,"y":1,"z":0},{"x":1,"y":0,"z":0}]');
    });
  });

  describe('multiply', function () {
    it('should multiply every vector in the list and return new VectorList', function () {
      var list = new VectorList([new Vector(0, 1, 0), new Vector(1, 0, 0)]);
      var actual = list.multiply(5);
      expect(list.toArray()).to.eql([[0, 1, 0], [1, 0, 0]]);
      expect(actual.toArray()).to.eql([[0, 5, 0], [5, 0, 0]]);
    });
  });

  describe('add', function () {
    it('should add vector to every vector and return new VectorList', function () {
      var list = new VectorList([new Vector(0, 1, 0), new Vector(1, 0, 0)]);
      var actual = list.add(new Vector(1, 1, 1));
      expect(list.toArray()).to.eql([[0, 1, 0], [1, 0, 0]]);
      expect(actual.toArray()).to.eql([[1, 2, 1], [2, 1, 1]]);
    });
  });
});
