var round = require('./round');

describe('round', function () {
  [
    {input: {num: 1/3, precision: 4}, expected: 0.3333},
    {input: {num: Math.PI, precision: 4}, expected: 3.1416},
    {input: {num: Math.PI, precision: 5}, expected: 3.14159},
    {input: {num: Math.PI, precision: 2}, expected: 3.14},
  ].forEach(function scenario(data) {
    it([
      'should return ' + data.expected,
      'for ' + data.input.num,
      'and precision ' + data.input.precision
    ].join(' '), function () {
      // Arrange
      var num = data.input.num;
      var precision = data.input.precision;
      var expected = data.expected;

      // Act
      var actual = round(num, precision);

      // Assert
      expect(actual).to.equal(expected);
    });
  });
});
