var React = require('react');
var T = React.PropTypes;
var AxisControl = require('./AxisControl');

var AxisControls = React.createClass({
  propTypes: {
    label: T.string.isRequired,
    action: T.string.isRequired,
    value: T.shape({
      x: T.number.isRequired,
      y: T.number.isRequired,
      z: T.number.isRequired
    }),
    step: T.number,
    onChange: T.func.isRequired
  },

  getDefaultProps: function () {
    return {
      step: 1
    };
  },

  render: function () {
    var label = this.props.label;
    var action = this.props.action;
    var value = this.props.value;
    var step = this.props.step;
    var handleChange = this.props.onChange;
    return (
      <fieldset>
        <legend>{label}</legend>
        {['x', 'y', 'z'].map(function (axis, key) {
          return <AxisControl
            action={action}
            axis={axis}
            step={step}
            value={value[axis]}
            onChange={handleChange}
            key={key}
          />
        }.bind(this))}
      </fieldset>
    );
  }
});

module.exports = AxisControls;
