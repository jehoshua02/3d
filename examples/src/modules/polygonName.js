function polygonName(sides) {
  var plain = sides + '-gon';
  if (sides < 3) {
    return [];
  } else if (sides <= 20) {
    return {
      3: ['trigon', 'triangle'],
      4: ['tetragon'],
      5: ['pentagon'],
      6: ['hexagon', 'sexagon'],
      7: ['heptagon'],
      8: ['octagon'],
      9: ['nonagon', 'enneagon'],
      10: ['decagon'],
      11: ['undecagon', 'hendecagon'],
      12: ['dodecagon'],
      13: ['triskaidecagon'],
      14: ['tetradecagon'],
      15: ['pentadecagon'],
      16: ['hexadecagon'],
      17: ['heptadecagon'],
      18: ['octadecagon'],
      19: ['enneadecagon'],
      20: ['icosagon'],
    }[sides];
  } else if (sides <= 99) {
    var ones = sides % 10;
    var tens = (sides - ones);
    var name = '';

    name += {
      20: 'icosi',
      30: 'triaconta',
      40: 'tetraconta',
      50: 'pentaconta',
      60: 'hexaconta',
      70: 'heptaconta',
      80: 'octaconta',
      90: 'enneaconta',
    }[tens];

    name += ones > 0 ? 'kai' + {
      1: 'hena',
      2: 'di',
      3: 'tri',
      4: 'tetra',
      5: 'penta',
      6: 'hexa',
      7: 'hepta',
      8: 'octa',
      9: 'ennea',
    }[ones] : '';

    name += 'gon';

    return [name, plain];
  } else {
    return [sides + '-gon'];
  }
}

module.exports = polygonName;
