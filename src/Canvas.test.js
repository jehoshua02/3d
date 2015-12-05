var sinon = require('sinon');
var Canvas = require('./Canvas');

describe('Canvas', function () {
  it('should have immutable width and height properties', function () {
    var canvas = new Canvas(fakeNode());
    expect(canvas.width).to.equal(300);
    expect(canvas.height).to.equal(200);
    canvas.width = 200;
    canvas.height = 100;
    expect(canvas.width).to.equal(300);
    expect(canvas.height).to.equal(200);
  });

  describe('vertices', function () {
    [
      {name: 'leftTop', expected: [0, 0, 0]},
      {name: 'centerTop', expected: [150, 0, 0]},
      {name: 'rightTop', expected: [300, 0, 0]},
      {name: 'leftCenter', expected: [0, 100, 0]},
      {name: 'center', expected: [150, 100, 0]},
      {name: 'rightCenter', expected: [300, 100, 0]},
      {name: 'leftBottom', expected: [0, 200, 0]},
      {name: 'centerBottom', expected: [150, 200, 0]},
      {name: 'rightBottom', expected: [300, 200, 0]},
    ].forEach(function (data) {
      it('should have ' + data.name + ' of [' + data.expected + ']', function () {
        var canvas = new Canvas(fakeNode());
        var v = canvas[data.name];
        expect(v.toArray()).to.eql(data.expected);
      });
    });
  });

  describe('resize', function () {
    it('should resize canvas to new width and height', function () {
      var canvas = new Canvas(fakeNode());
      expect(canvas.width).to.equal(300);
      expect(canvas.height).to.equal(200);
      canvas.resize(200, 100);
      expect(canvas.width).to.equal(200);
      expect(canvas.height).to.equal(100);
    });

    it('should rely on intrinsic width and height with no arguments', function () {
      var canvas = new Canvas(fakeNode({
        offsetWidth: 600,
        offsetHeight: 400,
      }));
      canvas.resize();
      expect(canvas.width).to.equal(600);
      expect(canvas.height).to.equal(400);
    });
  });

  describe('clear', function () {
    it('should clear call clearRect on canvas context', function () {
      var spy = sinon.spy();
      var canvas = new Canvas(fakeNode({context: {clearRect: spy}}));
      canvas.clear();
      expect(spy.callCount).to.equal(1);
      expect(spy.calledWithExactly(0, 0, canvas.width, canvas.height)).to.be.true;
    });
  });

  function fakeNode(props) {
    var context = props && props.context || {};
    return Object.assign({
      width: 300,
      height: 200,
      getContext: function () {
        return context;
      }
    }, props || {});
  }
});
