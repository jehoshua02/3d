var VectorList = require('./VectorList');
var Vector = require('./Vector');

describe('VectorList', function () {
  it('should expose read only vector list', function () {
    var list = new VectorList([new Vector(1, 0, 0)]);
    list.vectors.push(new Vector(0, 1, 0));
    var actual = list.vectors.map(function (v) {return v.toArray()});
    expect(actual).to.eql([[1, 0, 0]]);
  });
});
