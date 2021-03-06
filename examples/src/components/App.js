var React = require('react');
var SingleVector2DTransformExample = require('components/examples/SingleVector2DTransformExample');
var PolygonExample = require('components/examples/PolygonExample');
var PolyhedronExample = require('components/examples/PolyhedronExample');
var SceneExample = require('components/examples/SceneExample');

require('style.css');

var Examples = React.createClass({
  render: function () {
    var style = this._style();
    return (
      <div style={style.root}>
        <div style={style.page}>
          <h1>Examples</h1>
          <SingleVector2DTransformExample />
          <PolygonExample />
          <PolyhedronExample />
          <SceneExample />
        </div>
      </div>
    );
  },

  _style: function () {
    return {
      root: {
        padding: 20
      },
      page: {
        maxWidth: 600,
        margin: '0 auto'
      }
    };
  }
});

module.exports = Examples;
