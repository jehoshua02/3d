var React = require('react');

var Heading = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      hover: false
    };
  },

  render: function () {
    var style = this._style();
    var text = titleize(this.props.text);
    var id = hyphenate(this.props.text);
    var href = '#' + id;
    return (
      <h2 id={id}>
        <a href={href} style={style.link}
          onMouseOver={this._toggleHover}
          onMouseOut={this._toggleHover}
        >
          <span style={style.icon}>#</span>{text}
        </a>
      </h2>
    );
  },

  _style: function () {
    var hover = this.state.hover;
    return {
      link: {
        textDecoration: 'none',
        color: hover ? 'hotpink' : 'inherit',
        textShadow: hover ? '1px 1px 2px rgba(0, 0, 0, 0.3)' : null,
        transition: 'all .3s',
      },
      icon: {
        transition: 'all .3s',
        width: hover ? 12 : 0,
        display: 'inline-block',
        verticalAlign: 'bottom',
        overflow: 'hidden',
        color: 'hotpink',
      }
    };
  },

  _toggleHover: function () {
    this.setState({hover: !this.state.hover});
  }
});

function hyphenate(str) {
  return decamelize(str, '-').toLowerCase();
}

function titleize(str) {
  return decamelize(str, ' ');
}

function decamelize(str, separator) {
  return str.replace(/(?!^)((?![A-Z])[0-9]|[A-Z][^A-Z])/g, function (s) {return separator + s});
}

module.exports = Heading;
