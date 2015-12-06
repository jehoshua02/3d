var ReactDOM = require('react-dom');
var React = require('react');
var Vector = require('src/Vector');
var Trig = require('src/Trigonometry');
var drawGrid = require('modules/drawGrid');
var drawAxis = require('modules/drawAxis');
var drawLine = require('modules/drawLine');
var drawCircle = require('modules/drawCircle');
var AxisControl = require('../molecules/AxisControl');
var Canvas = require('../molecules/Canvas');

var SingleVector2DTransformExample = React.createClass({
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
        z: 0,
      },
      autoRotate: true,
      speed: 1,
    };
  },
  render: function () {
    var style = this._style();
    return (
      <div>
        <h2>SingleVector2DTransformExample</h2>
        <Canvas style={style.canvas} draw={this._draw} />

        <fieldset>
          <legend>Translate</legend>
          {['x', 'y'].map(function (axis, key) {
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
          {['z'].map(function (axis, key) {
            return <AxisControl
              action='rotate'
              axis={axis}
              value={this.state.rotate[axis]}
              onChange={this._handleChange}
              key={key}
            />
          }.bind(this))}

          <label>Auto:
            <input type="checkbox" checked={this.state.autoRotate} onChange={this._toggleAutoRotate} />
          </label>

          <label>Speed:
            <input type="number" step="1" value={this.state.speed} onChange={this._changeSpeed} />
          </label>
        </fieldset>
      </div>
    );
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
      value = value % 360;
    }
    var state = {};
    state[type] = Object.assign({}, this.state[type]);
    state[type][axis] = value;
    this.setState(state);
  },

  _toggleAutoRotate: function () {
    this.setState({autoRotate: !this.state.autoRotate});
  },

  _changeSpeed: function (e) {
    var value = e.target.value;
    if (e.target.value.trim() === '') { return; }
    this.setState({speed: parseInt(value)});
  },

  _draw: function (canvas) {
    var style = this._style();
    var spacing = this._spacing();
    var autoRotate = this.state.autoRotate;

    drawGrid(canvas, spacing, style.grid);
    drawAxis(canvas, style.axis, style.ticks);
    drawCircle(canvas, this._point(canvas), 5, style.circle);

    if (autoRotate) {
      this._autoRotate();
      this._autoTranslate();
    }
  },

  _autoRotate: function () {
    var value = this.state.rotate.z + this.state.speed;
    this._handleChange({
      type: 'rotate',
      value: value,
      axis: 'z',
    });
  },

  _autoTranslate: function () {
    var amplitude = 100;
    var frequency = 2;
    var phase = (this.state.rotate.z / 360) * 2 * Math.PI;
    var value = amplitude * Math.sin(frequency * phase);
    this._handleChange({
      type: 'translate',
      value: value,
      axis: 'y',
    });
  },

  _point: function (canvas) {
    var t = this.state.translate;
    var r = this.state.rotate;
    return new Vector(t.x, t.y, t.z).rotate(
      Trig.degreesToRadians(r.x),
      Trig.degreesToRadians(r.y),
      Trig.degreesToRadians(r.z)
    ).add(canvas.center);
  },

  _spacing: function () {
    return 600 * (20 / 600);
  }
});

module.exports = SingleVector2DTransformExample;
