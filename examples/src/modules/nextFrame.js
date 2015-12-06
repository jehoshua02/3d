function nextFrame() {
  var _frame = null;
  return function (callback) {
    if (_frame) {
      window.cancelAnimationFrame(_frame);
    }
    _frame = window.requestAnimationFrame(callback);
  }
}

module.exports = nextFrame;
