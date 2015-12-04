var ReactDOM = require('react-dom');
var React = require('react');
var Vector = require('lib/Vector');
var Trig = require('lib/Trigonometry');

var VectorExample = React.createClass({
  getInitialState: function () {
    return {
      translate: {
        x: 0,
        y: 0,
        z: 0
      },
      rotate: {
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
        <h2>Rotation Example</h2>

        <canvas ref="canvas" style={style.canvas}></canvas>

        <fieldset>
          <legend>Translate</legend>
          <label>X:
            <input type="text"
              value={this.state.translate.x}
              onChange={this._handleTranslate.bind(this, 'x')}
            />
          </label>
          <label>Y:
            <input type="text"
              value={this.state.translate.y}
              onChange={this._handleTranslate.bind(this, 'y')}
            />
          </label>
          <label>Z:
            <input type="text"
              value={this.state.translate.z}
              onChange={this._handleTranslate.bind(this, 'z')}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Rotate</legend>
          <label>X:
            <input type="text"
              value={this.state.rotate.x}
              onChange={this._handleRotate.bind(this, 'x')}
            />
          </label>
          <label>Y:
            <input type="text"
              value={this.state.rotate.y}
              onChange={this._handleRotate.bind(this, 'y')}
            />
          </label>
          <label>Z:
            <input type="text"
              value={this.state.rotate.z}
              onChange={this._handleRotate.bind(this, 'z')}
            />
          </label>
        </fieldset>
      </div>
    );
  },

  componentDidMount: function () {
    this._draw();
  },

  componentDidUpdate: function () {
    this._draw();
  },

  _style: function () {
    return {
      canvas: {
        width: '100%',
        height: '300px',
        background: '#333',
      },
      axis: {
        strokeStyle: '#444',
        lineWidth: 1,
      },
      grid: {
        strokeStyle: '#888',
        lineDash: [1, this._spacing()]
      },
      ticks: {
        strokeStyle: 'hotpink',
        lineDash: [1, this._spacing()],
        lineWidth: 5,
      },
      circle: {
        fillStyle: 'hotpink'
      }
    };
  },

  _handleTranslate(axis, e) {
    var value = e.target.value;
    if (value === '') { value = 0; }
    var translate = Object.assign({}, this.state.translate);
    translate[axis] = value;
    this.setState({translate: translate});
  },

  _handleRotate: function (axis, e) {
    var value = e.target.value;
    if (value === '') { value = 0; }
    var rotate = Object.assign({}, this.state.rotate);
    rotate[axis] = value;
    this.setState({rotate: rotate});
  },

  _draw: function () {
    this._resize();
    this._clear();
    this._drawGridLines();
    this._drawAxis();
    this._drawPoint();
  },

  _resize: function () {
    var canvas = this._canvas();
    Object.assign(canvas, {
      width: canvas.offsetWidth,
      height: canvas.offsetHeight
    });
  },

  _clear: function () {
    var canvas = this._canvas();
    this._context().clearRect(0, 0, canvas.width, canvas.height);
  },

  _drawGridLines: function () {
    var canvas = this._canvas();
    var center = this._center();
    var style = this._style();

    var spacing = this._spacing() + 1;

    for (var x = 0; x <= canvas.width; x += spacing) {
      this._drawLine(
        new Vector(center.x + x, center.y - spacing, 0),
        new Vector(center.x + x, 0, 0),
        style.grid
      );
      this._drawLine(
        new Vector(center.x + x, center.y + spacing, 0),
        new Vector(center.x + x, canvas.height, 0),
        style.grid
      );
      this._drawLine(
        new Vector(center.x - x, center.y - spacing, 0),
        new Vector(center.x - x, 0, 0),
        style.grid
      );
      this._drawLine(
        new Vector(center.x - x, center.y + spacing, 0),
        new Vector(center.x - x, canvas.height, 0),
        style.grid
      );
    }
  },

  _drawAxis: function () {
    var style = this._style();
    var canvas = this._canvas();

    // horizontal
    this._drawLine(this._centerTop(), this._centerBottom(), style.axis);
    this._drawLine(this._center(), this._centerTop(), style.ticks);
    this._drawLine(this._center(), this._centerBottom(), style.ticks);

    // vertical
    this._drawLine(this._leftCenter(), this._rightCenter(), style.axis);
    this._drawLine(this._center(), this._leftCenter(), style.ticks);
    this._drawLine(this._center(), this._rightCenter(), style.ticks);
  },

  _drawPoint: function () {
    var style = this._style();
    var center = this._point();
    var radius = 5;
    this._drawCircle(center, radius, style.circle);
  },

  _point: function () {
    var t = this.state.translate;
    var r = this.state.rotate;
    return new Vector(t.x, -t.y, t.z).rotate(
      Trig.degreesToRadians(r.x),
      Trig.degreesToRadians(r.y),
      Trig.degreesToRadians(r.z)
    ).add(this._center());
  },

  _drawLine: function (a, b, style) {
    var context = this._context();
    Object.assign(context, style);
    if (style.lineDash) {
      context.setLineDash(style.lineDash);
    } else {
      context.setLineDash([0, 0]);
    }
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.stroke();
  },

  _drawCircle: function (center, radius, style) {
    var context = this._context();
    Object.assign(context, style);
    context.beginPath();
    context.moveTo(center.x, center.y);
    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    if (style.fillStyle) {
      context.fill();
    }
    if (style.strokeStyle) {
      context.stroke();
    }
  },

  _context: function () {
    return this._canvas().getContext('2d');
  },

  _center: function () {
    return this._rightBottom().divide(2);
  },

  _centerTop: function () {
    return new Vector(this._center().x, 0, 0);
  },

  _centerBottom: function () {
    return new Vector(this._center().x, this._canvas().height, 0);
  },

  _leftCenter: function () {
    return new Vector(0, this._center().y, 0);
  },

  _rightCenter: function () {
    return new Vector(this._canvas().width, this._center().y, 0);
  },

  _rightBottom: function () {
    var canvas = this._canvas();
    return new Vector(canvas.width, canvas.height);
  },

  _canvas: function () {
    return this.refs.canvas;
  },

  _spacing: function () {
    return 600 * (20 / 600);
  }
});

module.exports = VectorExample;
