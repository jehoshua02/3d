var React = require('react');
var Type = React.PropTypes;

var AxisControl = React.createClass({
  propTypes: {
    action: Type.string.isRequired,
    axis: Type.string.isRequired,
    value: Type.number.isRequired,
    onChange: Type.func.isRequired,
    step: Type.number,
  },
  getDefaultProps: function () {
    return {
      step: 10,
    }
  },
  render: function () {
    var axis = this.props.axis;
    var value = this.props.value;
    var step = this.props.step;
    return (
      <label>{axis.toUpperCase()}
        <input type="number" step={step}
          value={value}
          onChange={this._handleChange}
        />
      </label>
    );
  },
  _handleChange: function (e) {
    var action = this.props.action;
    var axis = this.props.axis;
    var value = parseInt(e.target.value);
    this.props.onChange({type: action, axis, value, e});
  }
});

module.exports = AxisControl;
