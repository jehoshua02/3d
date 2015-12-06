var ReactDOM = require('react-dom');
var React = require('react');
var Type = React.PropTypes;
var Vector = require('src/Vector');
var Trig = require('src/Trigonometry');
var Canvas = require('src/Canvas');
var drawGrid = require('modules/drawGrid');
var drawAxis = require('modules/drawAxis');
var drawLine = require('modules/drawLine');
var drawCircle = require('modules/drawCircle');

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
    drawCircle(canvas, this._point(), 5, style.circle);
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
    return new Canvas(this.refs.canvas);
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

module.exports = VectorExample;
