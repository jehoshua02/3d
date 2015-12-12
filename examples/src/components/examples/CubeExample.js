var React = require('react');
var Heading = require('../molecules/Heading');
var AxisControls = require('../molecules/AxisControls');
var Canvas = require('../molecules/Canvas');
var Vector = require('src/Vector');
var VectorList = require('src/VectorList');
var Trig = require('src/Trigonometry');
var drawPolygon = require('../../modules/drawPolygon');
var randomColor = require('random-color');
var sineWave = require('../../modules/sineWave');

var colors = new Array(6).fill(true, 0, 6).map(function () {return randomColor()});

console.log(colors);

var CubeExample = React.createClass({
  getInitialState: function () {
    return {
      auto: true,
      speed: 1,
      rotate: {
        x: 0,
        y: 0,
        z: 0
      },
      translate: {
        x: 0,
        y: 0,
        z: 0
      }
    };
  },

  render: function () {
    var style = this._style();
    return (
      <div>
        <Heading text="CubeExample" />

        <label>Auto:
          <input type="checkbox" checked={this.state.auto} onChange={this._toggleAuto} />
        </label>

        <label>Speed:
          <input type="number" step="1" value={this.state.speed} onChange={this._changeSpeed} />
        </label>

        <AxisControls
          label="Rotate" action="rotate"
          value={this.state.rotate}
          step={5}
          onChange={this._handleRotate}
        />

        <AxisControls
          label="Translate" action="translate"
          value={this.state.translate}
          step={5}
          onChange={this._handleTranslate}
        />

        <h4>{name}</h4>

        <Canvas style={style.canvas} draw={this._draw} />
      </div>
    );
  },

  _style: function () {
    return {
      canvas: {
        background: '#333',
      },
      cube: {
        0: {fillStyle: colors[0]},
        1: {fillStyle: colors[1]},
        2: {fillStyle: colors[2]},
        3: {fillStyle: colors[3]},
        4: {fillStyle: colors[4]},
        5: {fillStyle: colors[5]},
      }
    };
  },

  _handleRotate: function (action) {
    var value = action.value;
    var axis = action.axis;
    var rotate = this.state.rotate;
    rotate[axis] = value;
    this.setState({rotate: rotate});
  },

  _handleTranslate: function (action) {
    var value = action.value;
    var axis = action.axis;
    var translate = this.state.translate;
    translate[axis] = value;
    this.setState({translate: translate});
  },

  _toggleAuto: function () {
    this.setState({auto: !this.state.auto});
  },

  _changeSpeed: function (e) {
    var value = e.target.value;
    if (e.target.value.trim() === '') { return; }
    this.setState({speed: parseInt(value)});
  },

  _draw: function (canvas) {
    var style = this._style();
    var radians = Trig.degreesToRadians;
    var rotate = this.state.rotate;
    var translate = this.state.translate;

    var cube = makeCube()
      .rotate(
        radians(rotate.x), radians(rotate.y), radians(rotate.z)
      )
      .add(translate)
      .multiply((canvas.height / 2) * 0.4)
      .add(canvas.center);

    drawPolyhedron(canvas, cube.faces, style.cube);

    if (this.state.auto) {
      this._autoChange();
    }
  },

  _autoChange: function () {
    var speed = this.state.speed;
    this.setState({
      rotate: {
        x: sineWave(360, 3 * speed),
        y: sineWave(360, 2 * speed),
        z: sineWave(360, 1 * speed),
      }
    });
  }
});

function makeCube() {
  var vectors = new VectorList([
    new Vector(-1, -1, -1),
    new Vector(1, -1, -1),
    new Vector(1, 1, -1),
    new Vector(-1, 1, -1),
    new Vector(-1, -1, 1),
    new Vector(1, -1, 1),
    new Vector(1, 1, 1),
    new Vector(-1, 1, 1),
  ]);

  var faces = [
    [0, 1, 2, 3],
    [1, 5, 6, 2],
    [5, 4, 7, 6],
    [4, 0, 3, 7],
    [0, 1, 5, 4],
    [3, 2, 6, 7],
  ];

  return new Polyhedron(vectors, faces);
}

function Polyhedron(vectors, faces) {
  Object.defineProperties(this, {
    vectors: {get: function () {
      return vectors;
    }},
    faces: {get: function () {
      return faces.map(function (face) {
        return new VectorList(face.map(function (i) {
          return vectors.vectors[i];
        }));
      });
    }},
    _faces: {get: function () {
      return faces;
    }}
  });
}

Polyhedron.prototype.multiply = function (factor) {
  return new Polyhedron(this.vectors.multiply(factor), this._faces);
}

Polyhedron.prototype.add = function (vector) {
  return new Polyhedron(this.vectors.add(vector), this._faces);
}

Polyhedron.prototype.rotate = function (x, y, z) {
  return new Polyhedron(this.vectors.rotate(x, y, z), this._faces);
}

function drawPolyhedron(canvas, faces, style) {
  var avgZ = function (vectors) {
    var z = vectors.map(function (v) {return v.z});
    var sum = z.reduce(function (sum, z) {return sum + z});
    return sum / z.length;
  }

  faces = faces.map(function (face, i) {
    return {
      avgZ: avgZ(face.vectors),
      vectors: face.vectors,
      index: i
    };
  }).sort(function (a, b) {return a.avgZ - b.avgZ});

  faces.forEach(function (face, i) {
    drawPolygon(canvas, face.vectors, style[face.index]);
  });
}

module.exports = CubeExample;
