var ReactDOM = require('react-dom');
var React = require('react');
var _Canvas = require('src/Canvas');
var ResizeSensor = require('./ResizeSensor');

var Canvas = React.createClass({
  propTypes: {
    style: React.PropTypes.object.isRequired,
    draw: React.PropTypes.func.isRequired,
  },

  render: function () {
    var style = this._style();

    return (
      <div style={style.wrapper}>
        <canvas ref="canvas" style={style.canvas}></canvas>
        <ResizeSensor onResize={this._draw} />
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
      wrapper: Object.assign({
        position: 'relative',
      }, this.props.style),
      canvas: {
        width: '100%',
        height: '100%',
      }
    };
  },

  _draw: function () {
    var canvas = new _Canvas(this.refs.canvas);
    canvas.reset();
    this.props.draw(canvas);
  }
});

module.exports = Canvas;
