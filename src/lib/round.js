module.exports = function round(num, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}
