var Trig = require('./Trigonometry');

describe('Trigonometry', function () {
  describe('findHypotenuseGivenAdjacentAndOpposite', function () {
    it('should return sqrt(13) for [2, 3]', function () {
      expect(Trig.findHypotenuseGivenAdjacentAndOpposite(2, 3)).to.equal(Math.sqrt(13));
    });

    it('should return 2 for [2, 0]', function () {
      expect(Trig.findHypotenuseGivenAdjacentAndOpposite(2, 0)).to.equal(2);
    });

    it('should return 2 for [0, 2]', function () {
      expect(Trig.findHypotenuseGivenAdjacentAndOpposite(0, 2)).to.equal(2);
    });
  });

  describe('findAngleGivenOppositeAndAdjacent', function () {
    it('should return 0.785398 for [1, 1]', function () {
      var actual = Trig.findAngleGivenOppositeAndAdjacent(1, 1);
      expect(actual).to.equal(Trig.degreesToRadians(45));
    });
  });

  describe('findAdjacentGivenHypotenuseAndAngle', function () {
    it('should return 1 for [1, 1, 45]', function () {
      var hypotenuse = Trig.findHypotenuseGivenAdjacentAndOpposite(1, 1);
      var angle = Trig.degreesToRadians(45);
      var actual = Trig.findAdjacentGivenHypotenuseAndAngle(hypotenuse, angle);
      expect(actual - 1).to.be.lt(0.0000000001);
    });
  });

  describe('findOppositeGivenHypotenuseAndAngle', function () {
    it('should return 2 for [2, 2, 45]', function () {
      var hypotenuse = Trig.findHypotenuseGivenAdjacentAndOpposite(2, 2);
      var angle = Trig.degreesToRadians(45);
      var actual = Trig.findOppositeGivenHypotenuseAndAngle(hypotenuse, angle);
      expect(actual).to.equal(2);
    });
  });
});
