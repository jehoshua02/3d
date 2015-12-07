var React = require('react');
var Canvas = require('../molecules/Canvas');
var Vector = require('src/Vector');
var Trig = require('src/Trigonometry');
var polygonName = require('../../modules/polygonName');
var capitalize = require('../../modules/capitalize');

var PolygonExample = React.createClass({
  getInitialState: function () {
    return {
      sides: 3
    };
  },

  render: function () {
    var style = this._style();
    var sides = this.state.sides;
    var name = polygonName(sides).map(capitalize).join(' / ');
    return (
      <div>
        <h2>Polygon Example</h2>
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
    var style = this._style();
    drawPolygon(canvas, canvas.center, canvas.height * 0.4, this.state.sides, style.polygon);
  },

  _changeSides: function (e) {
    this.setState({sides: parseInt(e.target.value)});
  }
});

function drawPolygon(canvas, center, radius, sides, style) {
  var context = canvas._context;
  Object.assign(context, style);
  context.beginPath();
  for (var i = 0; i < sides; i++) {
    var a = 360 / sides;
    var v = new Vector(0, -radius, 0)
      .rotateZ(Trig.degreesToRadians(a * i))
      .add(center);
    var method = (i === 0) ? 'moveTo' : 'lineTo';
    context[method](v.x, v.y);
  }
  context.closePath();
  context.fill();
}

module.exports = PolygonExample;
