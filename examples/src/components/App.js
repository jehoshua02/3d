var ReactDOM = require('react-dom');
var React = require('react');
var Transform2DExample = require('components/examples/Transform2DExample');

var Examples = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Examples</h1>
        <Transform2DExample />
      </div>
    );
  }
});

module.exports = Examples;
