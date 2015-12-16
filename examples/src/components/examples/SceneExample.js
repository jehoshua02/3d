var React = require('react');
var Heading = require('components/molecules/Heading');
var Canvas = require('components/molecules/Canvas');
var style = require('components/style');

class SceneExample extends React.Component {
  render() {
    return (
      <div>
        <Heading text="SceneExample" />

        <Canvas style={style.canvas} draw={this._draw} />
      </div>
    );
  }

  _style() {
    return Object.assign({}, style, {});
  }

  _draw(canvas) {
    // TODO render scene
    // + Block pyramid .:.
    // + Gridlines
    // + Object, Group, Scene origin markers
    // + Camera controls
  }
}

module.exports = SceneExample;
