var ReactDOM = require('react-dom');
var React = require('react');
var _Canvas = require('src/Canvas');

var Canvas = React.createClass({
  propTypes: {
    style: React.PropTypes.object.isRequired,
    draw: React.PropTypes.func.isRequired,
  },

  render: function () {
    return (
      <canvas ref="canvas" style={this.props.style}></canvas>
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

  _draw: function () {
    var canvas = new _Canvas(this.refs.canvas);
    canvas.reset();
    this.props.draw(canvas);
  }
});

module.exports = Canvas;
