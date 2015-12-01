var Trigonometry = {};

Trigonometry.findHypotenuseGivenAdjacentAndOpposite = function (adjacent, opposite) {
  return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}

Trigonometry.findHypotenuseGivenAngleAndOpposite = function (angle, opposite) {
  return opposite / Math.sin(angle);
}

Trigonometry.findHypotenuseGivenAngleAndAdjacent = function (angle, adjacent) {
  return adjacent / Math.cos(angle);
}

Trigonometry.percentToRadians = function (percent) {
  return percent * 2 * Math.PI;
}

Trigonometry.degreesToRadians = function (degrees) {
  return (degrees / 360) * 2 * Math.PI;
}

module.exports = Trigonometry;
