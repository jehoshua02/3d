var React = require('react');
var ReactDOM = require('react-dom');
var Type = React.PropTypes;

var AxisControl = React.createClass({
  propTypes: {
    action: Type.string.isRequired,
    axis: Type.string.isRequired,
    value: Type.number.isRequired,
    onChange: Type.func.isRequired,
  },
  render: function () {
    var axis = this.props.axis;
    var value = this.props.value;
    return (
      <label>{axis.toUpperCase()}:
        <input type="number" step="10"
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
