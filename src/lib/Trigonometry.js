var Trigonometry = {};

define(Trigonometry, 'find.hypotenuse.given.adjacent.and.opposite', function (adjacent, opposite) {
  return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
});

define(Trigonometry, 'find.hypotenuse.given.angle.and.opposite', function (angle, opposite) {
  return opposite / Math.sin(angle);
});

define(Trigonometry, 'find.hypotenuse.given.angle.and.adjacent', function (angle, adjacent) {
  return adjacent / Math.cos(angle);
});

define(Trigonometry, 'convert.percent.to.radians', function (percent) {
  return percent * 2 * Math.PI;
});

define(Trigonometry, 'convert.degrees.to.radians', function (degrees) {
  return (degrees / 360) * 2 * Math.PI;
});

function define(target, path, fn) {
  var parts = path.split('.given.');
  var find = parts[0];
  var given = parts[1].split('.and.');
  combinations(given, function (keys) {
    var path = [find, 'given'].concat(keys.join('.and.')).join('.');
    set(target, path, function () { return fn.apply(null, sortByKeys(arguments, keys, given)); });
  });
}

function sortByKeys(values, from, to) {
  var result = [];
  for (var i = 0; i < to.length; i++) {
    result.push(values[from.indexOf(to[i])]);
  }
  return result;
}

function combinations(items, fn) {
  // TODO not sure how to do this ...
  fn(items);
}

function set(target, path, value) {
  var parts = path.split('.');
  var last = parts.length - 1;
  for (var i = 0; i <= last; i++) {
    var part = parts[i];
    if (!target[part]) {
      target[part] = (i === last) ? value : {};
    }
    target = target[part];
  }
}

module.exports = Trigonometry;
