var React = require('react');
var Heading = require('../molecules/Heading');
var AxisControls = require('../molecules/AxisControls');
var Canvas = require('../molecules/Canvas');
var Vector = require('src/Vector');
var VectorList = require('src/VectorList');
var Trig = require('src/Trigonometry');
var drawPolygon = require('../../modules/drawPolygon');
var sineWave = require('../../modules/sineWave');
var makeRegularPolygon = require('../../modules/makeRegularPolygon');
var style = require('components/style');

var PolyhedronExample = React.createClass({
  getInitialState: function () {
    return {
      auto: true,
      speed: 5,
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
        <Heading text="PolyhedronExample" />

        <label>Auto
          <input type="checkbox" checked={this.state.auto} onChange={this._toggleAuto} />
        </label>

        <label>Speed
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
          step={1}
          onChange={this._handleTranslate}
        />

        <h4>{name}</h4>

        <Canvas style={style.canvas} draw={this._draw} />
      </div>
    );
  },

  _style: function () {
    return Object.assign({}, style, {});
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
    var viewDistance = 10;
    var view = new View(canvas, viewDistance);

    var tetrahedron = makeTetrahedron()
      .multiply(1.5)
      .rotate(radians(rotate.x), radians(rotate.y), radians(rotate.z))
      .add(translate)
      .add(new Vector(-2, 0, 5))
      .project(view);

    drawPolyhedron(canvas, tetrahedron.faces, style.cube);

    var cube = makeCube()
      .rotate(radians(rotate.x), radians(rotate.y), radians(rotate.z))
      .add(translate)
      .add(new Vector(2, 0, 5))
      .project(view);

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
  var vectors = [
    new Vector(-1, -1, -1),
    new Vector(1, -1, -1),
    new Vector(1, 1, -1),
    new Vector(-1, 1, -1),
    new Vector(-1, -1, 1),
    new Vector(1, -1, 1),
    new Vector(1, 1, 1),
    new Vector(-1, 1, 1),
  ];

  var faces = [
    [0, 1, 2, 3],
    [1, 5, 6, 2],
    [5, 4, 7, 6],
    [4, 0, 3, 7],
    [0, 1, 5, 4],
    [3, 2, 6, 7],
  ];

  return new Polyhedron(faces.map(function (face) {
    return new VectorList(face.map(function (i) {return vectors[i]}));
  }));
}

function makeTetrahedron() {
  var deg = Trig.degreesToRadians;
  var faces = [];

  for (var i = 0; i < 3; i++) {
    var face = makeRegularPolygon(3);
    var angle = Math.asin(Math.sin(deg(30)) / (1 + Math.sin(deg(30))));
    var face = makeRegularPolygon(3);
    var o = face.vectors[0];
    faces.push(
      face.subtract(o)
      .rotate(angle, deg(360 / 3) * i, 0)
      .add(o)
    );
  }

  var face = makeRegularPolygon(3);
  var o = face.vectors[0];
  faces.push(
    face.subtract(o)
    .rotate(deg(90), 0, 0)
    .add(faces[1].vectors[1])
  );

  return new Polyhedron(faces);
}

function Polyhedron(faces) {
  Object.defineProperties(this, {
    faces: {get: function () {return faces}}
  });
}

Polyhedron.prototype.multiply = function (factor) {
  return new Polyhedron(this.faces.map(function (face) {return face.multiply(factor)}));
}

Polyhedron.prototype.add = function (vector) {
  return new Polyhedron(this.faces.map(function (face) {return face.add(vector)}));
}

Polyhedron.prototype.subtract = function (vector) {
  return new Polyhedron(this.faces.map(function (face) {return face.subtract(vector)}));
}

Polyhedron.prototype.rotate = function (x, y, z) {
  return new Polyhedron(this.faces.map(function (face) {return face.rotate(x, y, z)}));
}

Polyhedron.prototype.project = function (view) {
  return new Polyhedron(this.faces.map(function (face) {
    return new VectorList(face.vectors.map(function (vector) {
      return view.project(vector);
    }));
  }));
}

function View(canvas) {
  this.canvas = canvas;
}

View.prototype.project = function (vector) {
  var width = this.canvas.width / 2;
  var height = this.canvas.height / 2;
  var angle = Trig.degreesToRadians(90 / 2);
  var distance = width / Math.tan(angle);
  var x = (vector.x / ((width / distance) * vector.z)) * width + width;
  var y = (vector.y / ((height / distance) * vector.z)) * height + height;
  return new Vector(x, y, vector.z);
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
  }).sort(function (a, b) {return b.avgZ - a.avgZ});

  faces.forEach(function (face, i) {
    drawPolygon(canvas, face.vectors, style[face.index]);
  });
}

module.exports = PolyhedronExample;
