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
});
