var ReactDOM = require('react-dom');
var React = require('react');
var Type = React.PropTypes;
var Vector = require('src/Vector');
var Trig = require('src/Trigonometry');

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
    this._canvas().resize();
    this._canvas().clear();
    this._drawGridLines();
    this._drawAxis();
    this._drawPoint();
  },

  _drawGridLines: function () {
    var canvas = this._canvas();
    var center = canvas.center;
    var style = this._style();

    var spacing = this._spacing() + 1;

    for (var x = 0; x <= canvas.width; x += spacing) {
      canvas.drawLine(
        new Vector(center.x + x, center.y - spacing, 0),
        new Vector(center.x + x, 0, 0),
        style.grid
      );
      canvas.drawLine(
        new Vector(center.x + x, center.y + spacing, 0),
        new Vector(center.x + x, canvas.height, 0),
        style.grid
      );
      canvas.drawLine(
        new Vector(center.x - x, center.y - spacing, 0),
        new Vector(center.x - x, 0, 0),
        style.grid
      );
      canvas.drawLine(
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
    canvas.drawLine(canvas.centerTop, canvas.centerBottom, style.axis);
    canvas.drawLine(canvas.center, canvas.centerTop, style.ticks);
    canvas.drawLine(canvas.center, canvas.centerBottom, style.ticks);

    // vertical
    canvas.drawLine(canvas.leftCenter, canvas.rightCenter, style.axis);
    canvas.drawLine(canvas.center, canvas.leftCenter, style.ticks);
    canvas.drawLine(canvas.center, canvas.rightCenter, style.ticks);
  },

  _drawPoint: function () {
    var style = this._style();
    var center = this._point();
    var radius = 5;
    this._canvas().drawCircle(center, radius, style.circle);
  },

  _point: function () {
    var t = this.state.translate;
    var r = this.state.rotate;
    return new Vector(t.x, -t.y, t.z).rotate(
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

function Canvas(node) {
  Object.defineProperties(this, {
    node: {
      get: function () {
        return node;
      }
    },
    width: {
      get: function () {
        return node.width;
      }
    },
    height: {
      get: function () {
        return node.height;
      }
    },
    context: {
      get: function () {
        return node.getContext('2d');
      }
    },
    center: {
      get: function () {
        return new Vector(this.width / 2, this.height / 2, 0);
      }
    },
    centerTop: {
      get: function () {
        return new Vector(this.center.x, 0, 0);
      }
    },
    centerBottom: {
      get: function () {
        return new Vector(this.center.x, this.height, 0);
      }
    },
    leftCenter: {
      get: function () {
        return new Vector(0, this.center.y, 0);
      },
    },
    rightCenter: {
      get: function () {
        return new Vector(this.width, this.center.y, 0);
      },
    },
    rightBottom: {
      get: function () {
        return new Vector(this.width, this.height);
      }
    },
  });
}

Canvas.prototype.clear = function () {
  this.context.clearRect(0, 0, this.width, this.height);
}

Canvas.prototype.resize = function () {
  var node = this.node;
  Object.assign(node, {
    width: node.offsetWidth,
    height: node.offsetHeight
  });
}

Canvas.prototype.drawLine = function (a, b, style) {
  var context = this.context;
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

Canvas.prototype.drawCircle = function (center, radius, style) {
  var context = this.context;
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
