var React = require('react');
var Heading = require('components/molecules/Heading');
var Canvas = require('components/molecules/Canvas');
var AxisControls = require('components/molecules/AxisControls');
var style = require('components/style');
var Vector = require('src/Vector');
var VectorList = require('src/VectorList');
var drawLine = require('modules/drawLine');
var Trig = require('src/Trigonometry');
var Color = require('color');
var sineWave = require('modules/sineWave');

class SceneExample extends React.Component {
  constructor() {
    super();
    this.state = this.initialState();
    ['_camera'].forEach(function (method) {this[method] = this[method].bind(this)}.bind(this));
  }

  initialState() {
    return {
      camera: {
        x: 0,
        y: 0,
        z: 0
      }
    };
  }

  render() {
    var style = this._style();
    var camera = this.state.camera;
    return (
      <div>
        <Heading text="SceneExample" />

        <AxisControls label="Camera" action="camera" value={camera} step={5} onChange={this._camera} />

        <Canvas style={style.canvas} draw={this._draw.bind(this)} />
      </div>
    );
  }

  _style() {
    return Object.assign({}, style, {
      line: {
        strokeStyle: 'hotpink', // Color('#333').darken(0.2).rgbString(),
        lineWidth: 1
      }
    });
  }

  _camera(action) {
    this.setState({camera: action.values});
  }

  _draw(canvas) {
    var camera = this.state.camera;
    var width = canvas.width;
    var height = canvas.height;
    var style = this._style();

    var line = new VectorList([new Vector(-100, 0, 0), new Vector(100, 0, 0)]);
    var gap = 0.5;
    var limit = 100 / gap;
    var lines = [line];
    var d90 = Trig.degreesToRadians(90);
    var l;
    for (var i = 0; i < limit; i++) {
      // horizontal lines
      lines.push(line.add(new Vector(0, 0, gap * i)));
      lines.push(line.add(new Vector(0, 0, gap * -i)));
      // vanishing lines
      lines.push(line.rotate(0, d90, 0).add(new Vector(gap * i, 0, 0)));
      lines.push(line.rotate(0, d90, 0).add(new Vector(gap * -i, 0, 0)));
    }

    new Group(lines)
      .add(new Vector(0, 1, 0))
      .rotate(
        Trig.degreesToRadians(camera.x),
        Trig.degreesToRadians(camera.y),
        Trig.degreesToRadians(camera.z)
      )
      .project(width, height)
      .members.forEach(function (line) {
        var vectors = line.vectors;
        drawLine(canvas, vectors[0], vectors[1], style.line);
      });
  }
}

function Group(members) {
  this.members = members;
}

Group.prototype.rotate = function (x, y, z) {
  return new Group(this.members.map(function (member) {return member.rotate(x, y, z)}));
}

Group.prototype.add = function (vector) {
  return new Group(this.members.map(function (member) {return member.add(vector)}));
}

Group.prototype.project = function (width, height) {
  return new Group(this.members.map(function (member) {return member.project(width, height)}));
}

VectorList.prototype.project = function (width, height) {
  return new VectorList(this.vectors.map(function (vector) {return vector.project(width, height)}));
}

module.exports = SceneExample;
