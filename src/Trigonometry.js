var Trigonometry = {};

Trigonometry.findHypotenuseGivenAdjacentAndOpposite = function (adjacent, opposite) {
  return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}

Trigonometry.findAngleGivenOppositeAndAdjacent = function (opposite, adjacent) {
  return Math.atan(opposite/adjacent);
}

Trigonometry.findAdjacentGivenHypotenuseAndAngle = function (hypotenuse, angle) {
  return hypotenuse * Math.cos(angle);
}

Trigonometry.findOppositeGivenHypotenuseAndAngle = function (hypotenuse, angle) {
  return hypotenuse * Math.sin(angle);
}

Trigonometry.percentToRadians = function (percent) {
  return percent * 2 * Math.PI;
}

Trigonometry.degreesToRadians = function (degrees) {
  return (degrees / 360) * 2 * Math.PI;
}

module.exports = Trigonometry;
