var ReactDOM = require('react-dom');
var React = require('react');
var SingleVector2DTransformExample = require('components/examples/SingleVector2DTransformExample');

var Examples = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Examples</h1>
        <SingleVector2DTransformExample />
      </div>
    );
  }
});

module.exports = Examples;
