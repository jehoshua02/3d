var ReactDOM = require('react-dom');
var React = require('react');
var VectorExample = require('components/VectorExample');

var Examples = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Examples</h1>
        <VectorExample />
      </div>
    );
  }
});

module.exports = Examples;
