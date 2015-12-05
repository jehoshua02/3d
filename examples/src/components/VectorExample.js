var ReactDOM = require('react-dom');
var React = require('react');
var Type = React.PropTypes;
var Vector = require('src/Vector');
var Trig = require('src/Trigonometry');
var NewCanvas = require('src/Canvas');

var VectorExample = React.createClass({
  getInitialState: function () {
    return {
      translate: {
        x: 60,
        y: 0,
        z: 0
      },
      rotate: {
        x: 0,
        y: 0,
        z: 30
      }
    };
  },
  render: function () {
    var style = this._style();
    return (
      <div>
        <canvas ref="canvas" style={style.canvas}></canvas>

        <fieldset>
          <legend>Translate</legend>
          {['x', 'y', 'z'].map(function (axis, key) {
            return <AxisControl
              action='translate'
              axis={axis}
              value={this.state.translate[axis]}
              onChange={this._handleChange}
              key={key}
            />
          }.bind(this))}
        </fieldset>

        <fieldset>
          <legend>Rotate</legend>
          {['x', 'y', 'z'].map(function (axis, key) {
            return <AxisControl
              action='rotate'
              axis={axis}
              value={this.state.rotate[axis]}
              onChange={this._handleChange}
              key={key}
            />
          }.bind(this))}
        </fieldset>
      </div>
    );
  },

  componentDidMount: function () {
    window.addEventListener('resize', this._draw);
    this._draw();
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._draw);
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

  _handleChange: function (action) {
    var type = action.type;
    var value = action.value;
    var axis = action.axis;
    if (type === 'rotate') {
      value = this._normalizeAngle(value);
    }
    var state = {};
    state[type] = Object.assign({}, this.state[type]);
    state[type][axis] = value;
    this.setState(state);
  },

  _normalizeAngle: function (angle) {
    return angle % 360;
  },

  _draw: function () {
    var canvas = this._canvas();
    var style = this._style();
    var spacing = this._spacing();

    canvas.reset();

    drawGrid(canvas, spacing, style.grid);
    drawAxis(canvas, style.axis, style.ticks);

    this._drawPoint();
  },

  _drawPoint: function () {
    var style = this._style();
    var center = this._point();
    var radius = 5;
    drawCircle(this._canvas(), center, radius, style.circle);
  },

  _point: function () {
    var t = this.state.translate;
    var r = this.state.rotate;
    return new Vector(t.x, t.y, t.z).rotate(
      Trig.degreesToRadians(r.x),
      Trig.degreesToRadians(r.y),
      Trig.degreesToRadians(r.z)
    ).add(this._canvas().center);
  },

  _canvas: function () {
    return new NewCanvas(this.refs.canvas);
  },

  _spacing: function () {
    return 600 * (20 / 600);
  }
});

var AxisControl = React.createClass({
  propTypes: {
    action: Type.string.isRequired,
    axis: Type.string.isRequired,
    value: Type.number.isRequired,
    onChange: Type.func.isRequired,
  },
  render: function () {
    var axis = this.props.axis;
    var value = this.props.value;
    return (
      <label>{axis.toUpperCase()}:
        <input type="number" step="10"
          value={value}
          onChange={this._handleChange}
        />
      </label>
    );
  },
  _handleChange: function (e) {
    var action = this.props.action;
    var axis = this.props.axis;
    var value = parseInt(e.target.value);
    this.props.onChange({type: action, axis, value, e});
  }
});

function drawGrid(canvas, spacing, style) {
  var center = canvas.center;
  spacing = spacing + 1;

  for (var x = 0; x <= canvas.width; x += spacing) {
    drawLine(
      canvas,
      new Vector(center.x + x, center.y - spacing, 0),
      new Vector(center.x + x, 0, 0),
      style
    );
    drawLine(
      canvas,
      new Vector(center.x + x, center.y + spacing, 0),
      new Vector(center.x + x, canvas.height, 0),
      style
    );
    drawLine(
      canvas,
      new Vector(center.x - x, center.y - spacing, 0),
      new Vector(center.x - x, 0, 0),
      style
    );
    drawLine(
      canvas,
      new Vector(center.x - x, center.y + spacing, 0),
      new Vector(center.x - x, canvas.height, 0),
      style
    );
  }
}

function drawAxis(canvas, axisStyle, ticksStyle) {
  // horizontal
  drawLine(canvas, canvas.centerTop, canvas.centerBottom, axisStyle);
  drawLine(canvas, canvas.center, canvas.centerTop, ticksStyle);
  drawLine(canvas, canvas.center, canvas.centerBottom, ticksStyle);

  // vertical
  drawLine(canvas, canvas.leftCenter, canvas.rightCenter, axisStyle);
  drawLine(canvas, canvas.center, canvas.leftCenter, ticksStyle);
  drawLine(canvas, canvas.center, canvas.rightCenter, ticksStyle);
}

function drawLine(canvas, a, b, style) {
  var context = canvas._context;
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
}

function drawCircle(canvas, center, radius, style) {
  var context = canvas._context;
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
}

module.exports = VectorExample;
