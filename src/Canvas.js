var V = require('./Vector');

function Canvas(node) {
  Object.defineProperties(this, {
    // dimensions
    width: {get: function () {return node.width}},
    height: {get: function () {return node.height}},

    // coordinates
    leftTop: {get: function () {return new V(0, 0, 0)}},
    centerTop: {get: function () {return new V(node.width / 2, 0, 0)}},
    rightTop: {get: function () {return new V(node.width, 0, 0)}},
    leftCenter: {get: function () {return new V(0, node.height / 2, 0)}},
    center: {get: function () {return new V(node.width / 2, node.height / 2, 0)}},
    rightCenter: {get: function () {return new V(node.width, node.height / 2, 0)}},
    leftBottom: {get: function () {return new V(0, node.height, 0)}},
    centerBottom: {get: function () {return new V(node.width / 2, node.height, 0)}},
    rightBottom: {get: function () {return new V(node.width, node.height, 0)}},

    // internal
    _node: {get: function () {return node}},
    _context: {get: function () {return node.getContext('2d')}},
  });
}

Canvas.prototype.resize = function (width, height) {
  if (arguments.length === 2) {
    this._node.width = width;
    this._node.height = height;
  } else if (arguments.length == 0) {
    console.log(this._node);
    this._node.width = this._node.offsetWidth;
    this._node.height = this._node.offsetHeight;
  }
}

Canvas.prototype.clear = function () {
  this._context.clearRect(0, 0, this.width, this.height);
}

module.exports = Canvas;
