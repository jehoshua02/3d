var Trig = require('./Trigonometry');
var Vector = require('./Vector');

describe('Vector', function () {
  it('should expose immutable x, y, z values', function () {
    // Arrange
    var v = new Vector(1, 2, 3);

    // Act
    v.x = 48;
    v.y = 3748;
    v.z = 12;

    // Assert
    expect(v.toArray()).to.eql([1, 2, 3]);
  });

  describe('toArray', function () {
    it('should return an array', function () {
      expect(new Vector(1, 2, 3).toArray()).to.eql([1, 2, 3]);
    });
  });

  describe('fromArray', function () {
    it('should create vector from array', function () {
      expect(Vector.fromArray([1, 2, 3]).toArray()).to.eql([1, 2, 3]);
    });
  });

  describe('add', function () {
    it('should return new vector, values added', function () {
      // Arrange
      var v = new Vector(1, 2, 3);

      // Act
      var actual = v.add(new Vector(1, 2, 3));

      // Assert
      expect(v.toArray()).to.eql([1, 2, 3]);
      expect(actual.toArray()).to.eql([2, 4, 6]);
    });
  });

  describe('subtract', function () {
    it('should return new vector, values subtracted', function () {
      // Arrange
      var v = new Vector(2, 4, 6);

      // Act
      var actual = v.subtract(new Vector(1, 2, 3));

      // Assert
      expect(v.toArray()).to.eql([2, 4, 6]);
      expect(actual.toArray()).to.eql([1, 2, 3]);
    });
  });

  describe('multiply', function () {
    it('should return new vector, values multiplied', function () {
      var v = new Vector(1, 2, 3);
      var actual = v.multiply(2);
      expect(v.toArray()).to.eql([1, 2, 3]);
      expect(actual.toArray()).to.eql([2, 4, 6]);
    });
  });

  describe('divide', function () {
    it('should return new vector, values divided', function () {
      var v = new Vector(2, 4, 6);
      var actual = v.divide(2);
      expect(v.toArray()).to.eql([2, 4, 6]);
      expect(actual.toArray()).to.eql([1, 2, 3]);
    });
  });

  describe('distance', function () {
    [
      {input: [3, 2, 0], expected: Math.sqrt(13)},
      {input: [0, 1, 0], expected: 1},
      {input: [1, 0, 0], expected: 1},
      {input: [0, 0, 1], expected: 1},
      {input: [1, 1, 1], expected: Math.sqrt(1 + Math.pow(Math.sqrt(1 + 1), 2))},
    ].forEach(function (data) {
      it([
        'should return', data.expected,
        'for [' + data.input + ']'
      ], function () {
        var x = data.input[0];
        var y = data.input[1];
        var z = data.input[2];
        var expected = data.expected;

        // Arrange
        var v = new Vector(0, 0, 0);

        // Act
        var actual = v.distance(new Vector(x, y, z));

        // Assert
        expect(actual).to.equal(expected);
      });
    });
  });

  [
    {axis: 'Z', scenarios: [
      {input: {v: [1, 0, 0], degrees: 0}, expected: [1, 0, 0]},
      {input: {v: [1, 0, 0], degrees: 90}, expected: [0, 1, 0]},
      {input: {v: [1, 0, 0], degrees: 180}, expected: [-1, 0, 0]},
      {input: {v: [1, 0, 0], degrees: 270}, expected: [0, -1, 0]},
      {input: {v: [1, 0, 0], degrees: 360}, expected: [1, 0, 0]},
    ]},
    {axis: 'Y', scenarios: [
      {input: {v: [1, 0, 0], degrees: 0}, expected: [1, 0, 0]},
      {input: {v: [1, 0, 0], degrees: 90}, expected: [0, 0, -1]},
      {input: {v: [1, 0, 0], degrees: 180}, expected: [-1, 0, 0]},
      {input: {v: [1, 0, 0], degrees: 270}, expected: [0, 0, 1]},
      {input: {v: [1, 0, 0], degrees: 360}, expected: [1, 0, 0]},
    ]},
    {axis: 'X', scenarios: [
      {input: {v: [0, 1, 0], degrees: 0}, expected: [0, 1, 0]},
      {input: {v: [0, 1, 0], degrees: 90}, expected: [0, 0, 1]},
      {input: {v: [0, 1, 0], degrees: 180}, expected: [0, -1, 0]},
      {input: {v: [0, 1, 0], degrees: 270}, expected: [0, 0, -1]},
      {input: {v: [0, 1, 0], degrees: 360}, expected: [0, 1, 0]},
    ]},
  ].forEach(function (group) {
    describe('rotate' + group.axis, function () {
      group.scenarios.forEach(function (data) {
        it([
          'should rotate [' + data.input.v + ']',
          'around', group.axis, 'axis',
          'by', data.input.degrees, 'degrees',
          'and return [' + data.expected + ']',
        ].join(' '), function () {
          // Arrange
          var axis = group.axis;
          var v = new Vector(
            data.input.v[0],
            data.input.v[1],
            data.input.v[2]
          );
          var angle = Trig.degreesToRadians(data.input.degrees);
          var expected = data.expected;

          // Act
          var actual = v['rotate' + axis](angle);

          // Assert
          var fix = function (num) {
            num = Math.round(num * 1000) / 1000;
            if (num == 0) { num = 0 }
            return num;
          }
          expect(actual.toArray().map(fix)).to.eql(expected);
        });
      });
    });
  });

});
