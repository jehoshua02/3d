var React = require('react');
var Heading = require('components/molecules/Heading');
var AxisControls = require('components/molecules/AxisControls');
var Canvas = require('components/molecules/Canvas');
var Vector = require('src/Vector');
var Trig = require('src/Trigonometry');
var sineWave = require('modules/sineWave');
var style = require('components/style');
var makeCube = require('modules/makeCube');
var makeTetrahedron = require('modules/makeTetrahedron');
var drawPolyhedron = require('modules/drawPolyhedron');

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

    var tetrahedron = makeTetrahedron()
      .multiply(1.5)
      .rotate(radians(rotate.x), radians(rotate.y), radians(rotate.z))
      .add(translate)
      .add(new Vector(-2, 0, 5))
      .project(canvas.width, canvas.height);

    drawPolyhedron(canvas, tetrahedron.faces, style.cube);

    var cube = makeCube()
      .rotate(radians(rotate.x), radians(rotate.y), radians(rotate.z))
      .add(translate)
      .add(new Vector(2, 0, 5))
      .project(canvas.width, canvas.height);

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

module.exports = PolyhedronExample;
