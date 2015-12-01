var Trig = require('lib/Trigonometry');
var Vector = require('./Vector');

describe('3D', function () {
  describe('Vector', function () {
    it('should expose immutable x, y, z values', function () {
      // Arrange
      var v = new Vector(1, 2, 3);

      // Act
      v.x = 48;
      v.y = 3748;
      v.z = 12;

      // Assert
      expect(v.x).to.equal(1);
      expect(v.y).to.equal(2);
      expect(v.z).to.equal(3);
    });

    describe('add', function () {
      it('should return new vector, values added', function () {
        // Arrange
        var v = new Vector(1, 2, 3);

        // Act
        var actual = v.add(new Vector(1, 2, 3));

        // Assert
        expect(v.x).to.equal(1);
        expect(v.y).to.equal(2);
        expect(v.z).to.equal(3);
        expect(actual.x).to.equal(2);
        expect(actual.y).to.equal(4);
        expect(actual.z).to.equal(6);
      });
    });

    describe('subtract', function () {
      it('should return new vector, values subtracted', function () {
        // Arrange
        var v = new Vector(2, 4, 6);

        // Act
        var actual = v.subtract(new Vector(1, 2, 3));

        // Assert
        expect(v.x).to.equal(2);
        expect(v.y).to.equal(4);
        expect(v.z).to.equal(6);
        expect(actual.x).to.equal(1);
        expect(actual.y).to.equal(2);
        expect(actual.z).to.equal(3);
      });
    });

    describe('multiply', function () {
      it('should return new vector, values multiplied', function () {
        var v = new Vector(1, 2, 3);
        var actual = v.multiply(2);
        expect(v.x).to.equal(1);
        expect(v.y).to.equal(2);
        expect(v.z).to.equal(3);
        expect(actual.x).to.equal(2);
        expect(actual.y).to.equal(4);
        expect(actual.z).to.equal(6);
      });
    });

    describe('divide', function () {
      it('should return new vector, values divided', function () {
        var v = new Vector(2, 4, 6);
        var actual = v.divide(2);
        expect(v.x).to.equal(2);
        expect(v.y).to.equal(4);
        expect(v.z).to.equal(6);
        expect(actual.x).to.equal(1);
        expect(actual.y).to.equal(2);
        expect(actual.z).to.equal(3);
      });
    });

    describe('distance', function () {
      [
        {input: [3, 2, 0], expected: Math.sqrt(13)},
        {input: [0, 1, 0], expected: 1},
        {input: [1, 0, 0], expected: 1},
        {input: [0, 0, 1], expected: 1},
        {input: [1, 1, 1], expected: Math.sqrt(1 + Math.pow(Math.sqrt(1 + 1), 2))},
      ].forEach(function (s) {
        it('should return ' + s.expected + ' for [' + s.input + ']', scenario(s));
      });

      function scenario(data) {
        return function () {
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
        }
      }
    });

    describe('rotateX', function () {
      it('should return new Vector, rotated around x axis', function () {
        var v = new Vector(1, 1, 1);
        var actual = v.rotateX(Trig.degreesToRadians(2));
        expect(actual.x).to.equal(1);
        expect(actual.y).to.equal('?');
        expect(actual.z).to.equal('?');
      });
    });
  });
});
