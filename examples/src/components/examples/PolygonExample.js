var React = require('react');
var Canvas = require('../molecules/Canvas');
var Trig = require('src/Trigonometry');
var Heading = require('../molecules/Heading');
var capitalize = require('capitalize');
var polygonName = require('../../modules/polygonName');
var drawPolygon = require('../../modules/drawPolygon');
var makeRegularPolygon = require('../../modules/makeRegularPolygon');

var PolygonExample = React.createClass({
  getInitialState: function () {
    return {
      sides: 3,
      auto: true,
    };
  },

  render: function () {
    var style = this._style();
    var sides = this.state.sides;
    var name = polygonName(sides).map(capitalize).join(' / ');
    return (
      <div>
        <Heading text="PolygonExample" />

        <label>Auto:
          <input type="checkbox" checked={this.state.auto} onChange={this._toggleAuto} />
        </label>

        <label>Sides:
          <input type="number" step="1" min="3" value={sides} onChange={this._changeSides} />
        </label>

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
    var polygon = makeRegularPolygon(sides).multiply(radius).add(center);
    drawPolygon(canvas, polygon, style);

    if (this.state.auto) {
      window.requestAnimationFrame(this._autoChangeSides);
    }
  },

  _toggleAuto: function () {
    this.setState({auto: !this.state.auto});
  },

  _autoChangeSides: function () {
    var now = new Date();
    var t = now.getSeconds() + now.getMilliseconds() / 1000;
    var a = 18;
    var w = Trig.degreesToRadians(360 / 10);
    var p = w * t;
    var sides = Math.max(3, Math.floor(a * Math.sin(w * t + p)) + 3);
    this.setState({sides: sides});
  },

  _changeSides: function (e) {
    this.setState({sides: parseInt(e.target.value)});
  }
});

module.exports = PolygonExample;
