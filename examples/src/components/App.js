var React = require('react');
var SingleVector2DTransformExample = require('components/examples/SingleVector2DTransformExample');
var PolygonExample = require('components/examples/PolygonExample');
var PolyhedronExample = require('components/examples/PolyhedronExample');

var Examples = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Examples</h1>
        <SingleVector2DTransformExample />
        <PolygonExample />
        <PolyhedronExample />
      </div>
    );
  }
});

module.exports = Examples;
