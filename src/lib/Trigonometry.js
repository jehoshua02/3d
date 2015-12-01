var Trigonometry = {
  find: {
    hypotenuse: {
      given: {
        adjacent: {and: {opposite: findHypotenuseGivenAdjacentAndOpposite}},
        opposite: {and: {adjacent: findHypotenuseGivenAdjacentAndOpposite}}
      }
    }
  }
};

function findHypotenuseGivenAdjacentAndOpposite(adjacent, opposite) {
  return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
}

module.exports = Trigonometry;
