var React = require('react');
var Canvas = require('../molecules/Canvas');
var Trig = require('src/Trigonometry');
var Heading = require('../molecules/Heading');
var capitalize = require('capitalize');
var polygonName = require('../../modules/polygonName');
var drawPolygon = require('../../modules/drawPolygon');
var makeRegularPolygon = require('../../modules/makeRegularPolygon');
var AxisControls = require('../molecules/AxisControls');
var sineWave = require('../../modules/sineWave');
var style = require('components/style');

var PolygonExample = React.createClass({
  getInitialState: function () {
    return {
      sides: 3,
      auto: true,
      rotate: {
        x: 0,
        y: 0,
        z: 0,
      }
    };
  },

  render: function () {
    var style = this._style();
    var sides = this.state.sides;
    var name = polygonName(sides).map(capitalize).join(' / ');
    var rotateX = this.state.rotateX;
    return (
      <div>
        <Heading text="PolygonExample" />

        <label>Auto
          <input type="checkbox" checked={this.state.auto} onChange={this._toggleAuto} />
        </label>

        <label>Sides
          <input type="number" step="1" min="3" value={sides} onChange={this._changeSides} />
        </label>

        <AxisControls
          label="Rotate" action="rotate"
          value={this.state.rotate}
          step={5}
          onChange={this._handleRotation}
        />

        <h4>{name}</h4>

        <Canvas style={style.canvas} draw={this._draw} />
      </div>
    );
  },

  _style: function () {
    return Object.assign({}, style, {
      polygon: {
        fillStyle: style.color.primary
      }
    });
  },

  _draw: function (canvas) {
    var style = this._style().polygon;
    var radius = canvas.height * 0.4;
    var center = canvas.center;
    var sides = this.state.sides;
    var rotate = this.state.rotate;
    var rotateX = Trig.degreesToRadians(rotate.x);
    var rotateY = Trig.degreesToRadians(rotate.y);
    var rotateZ = Trig.degreesToRadians(rotate.z);
    var polygon = makeRegularPolygon(sides)
      .rotate(rotateX, rotateY, rotateZ)
      .multiply(radius)
      .add(center);
    drawPolygon(canvas, polygon.vectors, style);

    if (this.state.auto) {
      window.requestAnimationFrame(this._autoChange);
    }
  },

  _toggleAuto: function () {
    this.setState({auto: !this.state.auto});
  },

  _autoChange: function () {
    this.setState({
      sides: Math.max(3, sineWave(18, 360 / 10) + 3),
      rotate: {
        x: sineWave(360, 3),
        y: sineWave(360, 2),
        z: sineWave(360, 1),
      },
    });
  },

  _changeSides: function (e) {
    this.setState({sides: parseInt(e.target.value)});
  },

  _handleRotation: function (action) {
    var value = action.value;
    var axis = action.axis;
    var rotate = this.state.rotate;
    rotate[axis] = value;
    this.setState({rotate: rotate});
  }
});

module.exports = PolygonExample;
