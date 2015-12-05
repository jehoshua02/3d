var Vector = require('./Vector');

/**
 * Interface for HTML Canvas.
 *
 * @param {HTMLCanvasElement} node
 */
function Canvas(node) {
  Object.defineProperties(this, {
    // dimensions
    width: {get: function () {return node.width}},
    height: {get: function () {return node.height}},

    // coordinates
    leftTop: {get: function () {return new Vector(0, 0, 0)}},
    centerTop: {get: function () {return new Vector(node.width / 2, 0, 0)}},
    rightTop: {get: function () {return new Vector(node.width, 0, 0)}},
    leftCenter: {get: function () {return new Vector(0, node.height / 2, 0)}},
    center: {get: function () {return new Vector(node.width / 2, node.height / 2, 0)}},
    rightCenter: {get: function () {return new Vector(node.width, node.height / 2, 0)}},
    leftBottom: {get: function () {return new Vector(0, node.height, 0)}},
    centerBottom: {get: function () {return new Vector(node.width / 2, node.height, 0)}},
    rightBottom: {get: function () {return new Vector(node.width, node.height, 0)}},

    // internal
    _node: {get: function () {return node}},
    _context: {get: function () {return node.getContext('2d')}},
  });
}

/**
 * Resizes canvas.
 *
 * If called with two arguments, will resize canvas element to specified width and height.
 *
 * If called with no arguments, will resize element to the element offsetWidth and offsetHeight,
 * which is it's intrinsic width and height in the document, influenced by styles.
 *
 * @param  {Number} width
 * @param  {Number} height
 * @return {undefined}
 */
Canvas.prototype.resize = function (width, height) {
  if (width && height) {
    this._node.width = width;
    this._node.height = height;
  } else {
    this._node.width = this._node.offsetWidth;
    this._node.height = this._node.offsetHeight;
  }
}

/**
 * Clears the canvas.
 *
 * Useful for resetting the canvas before redrawing.
 *
 * @return {undefined}
 */
Canvas.prototype.clear = function () {
  this._context.clearRect(0, 0, this.width, this.height);
}

/**
 * Resets the canvas.
 *
 * This method calls `resize` and then `clear`.
 *
 * It is important to call `resize` before you call `clear` since the latter
 * depends on the size of the canvas. This is a convenience method to combine
 * both into one method.
 *
 * @param {Number} width
 * @param {Number} height
 * @return {undefined}
 */
Canvas.prototype.reset = function (width, height) {
  this.resize.apply(this, arguments);
  this.clear();
}

module.exports = Canvas;
