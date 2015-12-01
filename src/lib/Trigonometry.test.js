var Trig = require('./Trigonometry');

describe('Trigonometry', function () {
  describe('find.hypotenuse.given.adjacent.and.opposite', function () {
    it('should return sqrt(13) for [2, 3]', function () {
      expect(Trig.find.hypotenuse.given.adjacent.and.opposite(2, 3)).to.equal(Math.sqrt(13));
    });

    it('should return 2 for [2, 0]', function () {
      expect(Trig.find.hypotenuse.given.adjacent.and.opposite(2, 0)).to.equal(2);
    });

    it('should return 2 for [0, 2]', function () {
      expect(Trig.find.hypotenuse.given.adjacent.and.opposite(0, 2)).to.equal(2);
    });
  });
});
