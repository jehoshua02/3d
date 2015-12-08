var React = require('react');
var Canvas = require('../molecules/Canvas');
var Trig = require('src/Trigonometry');
var Heading = require('../molecules/Heading');
var capitalize = require('capitalize');
var polygonName = require('../../modules/polygonName');
var drawPolygon = require('../../modules/drawPolygon');
var makeRegularPolygon = require('../../modules/makeRegularPolygon');
var AxisControl = require('../molecules/AxisControl');

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

        <label>Auto:
          <input type="checkbox" checked={this.state.auto} onChange={this._toggleAuto} />
        </label>

        <label>Sides:
          <input type="number" step="1" min="3" value={sides} onChange={this._changeSides} />
        </label>

        <fieldset>
          <legend>Rotate</legend>
          {['x', 'y', 'z'].map(function (axis, key) {
            return <AxisControl
              action='rotate'
              axis={axis}
              step={5}
              value={this.state.rotate[axis]}
              onChange={this._handleRotation}
              key={key}
            />
          }.bind(this))}
        </fieldset>

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
      polygon: {
        fillStyle: 'hotpink'
      }
    };
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

function sineWave(amplitude, rate) {
  var now = new Date();
  var time = now.getSeconds() + now.getMilliseconds() / 1000;
  var frequency = Trig.degreesToRadians(rate);
  var phase = frequency * time;
  return Math.floor(amplitude * Math.sin(frequency * time + phase));
}

module.exports = PolygonExample;
