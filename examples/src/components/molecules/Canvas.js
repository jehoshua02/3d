var ReactDOM = require('react-dom');
var React = require('react');
var _Canvas = require('src/Canvas');
var ResizeSensor = require('./ResizeSensor');
var nextFrame = require('../../modules/nextFrame')();

var Canvas = React.createClass({
  propTypes: {
    draw: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  },

  getDefaultProps: function () {
    return {
      style: {}
    };
  },

  render: function () {
    var style = this._style();

    return (
      <div style={style.root}>
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
    var ratio = screen.height / screen.width;
    return {
      root: Object.assign({
        position: 'relative',
        width: '100%',
        paddingTop: ratio * 100 + '%',
      }, this.props.style),
      canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }
    };
  },

  _draw: function () {
    nextFrame(function () {
      var canvas = new _Canvas(this.refs.canvas);
      canvas.reset();
      this.props.draw(canvas);
    }.bind(this));
  }
});

module.exports = Canvas;
