var React = require('react');
var Canvas = require('../molecules/Canvas');
var Vector = require('src/Vector');
var Trig = require('src/Trigonometry');
var polygonName = require('../../modules/polygonName');
var Heading = require('../molecules/Heading');
var capitalize = require('capitalize');

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
        <Heading text="PolygonExample" />

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
  },

  _changeSides: function (e) {
    this.setState({sides: parseInt(e.target.value)});
  }
});

function makeRegularPolygon(sides, radius) {
  var vectors = [];
  var a = 360 / sides;
  for (var i = 0; i < sides; i++) {
    var angle = Trig.degreesToRadians(a * i);
    vectors.push(new Vector(0, -1, 0).rotateZ(angle));
  }
  return new VectorList(vectors);
}

function VectorList(vectors) {
  this.vectors = vectors;
}

VectorList.prototype.map = function (fn) {
  return new VectorList(this.vectors.map(fn));
}

VectorList.prototype.forEach = function (fn) {
  this.vectors.forEach(fn);
}

VectorList.prototype.multiply = function (factor) {
  return this.map(function (v) {return v.multiply(factor)});
}

VectorList.prototype.add = function (vector) {
  return this.map(function (v) {return v.add(vector)});
}

function drawPolygon(canvas, polygon, style) {
  var context = canvas._context;
  Object.assign(context, style);
  context.beginPath();
  polygon.forEach(function (v, i) {
    var method = (i === 0) ? 'moveTo' : 'lineTo';
    context[method](v.x, v.y);
  });
  context.closePath();
  context.fill();
}

module.exports = PolygonExample;
