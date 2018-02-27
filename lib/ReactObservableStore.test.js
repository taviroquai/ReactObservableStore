'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ReactObservableStore = require('./ReactObservableStore');

var _ReactObservableStore2 = _interopRequireDefault(_ReactObservableStore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-16');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

var Component = function (_React$Component) {
    _inherits(Component, _React$Component);

    function Component() {
        _classCallCheck(this, Component);

        return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
    }

    _createClass(Component, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.props.foo
            );
        }
    }]);

    return Component;
}(_react2.default.Component);

test('throws error on empty init', function () {
    expect(function () {
        _ReactObservableStore2.default.init();
    }).toThrow();
});

test('throws error on invalid subscribe namespace', function () {
    expect(function () {
        var id = _ReactObservableStore2.default.subscribe('namespace', function upd(data) {});
    }).toThrow();
});

test('throws error on invalid update namespace', function () {
    expect(function () {
        _ReactObservableStore2.default.update('bla', {});
    }).toThrow();
});

test('init store', function () {
    var result = _ReactObservableStore2.default.get('namespace');
    expect(result).toBe(null);
    _ReactObservableStore2.default.init({ namespace: { foo: true } });
    _ReactObservableStore2.default.init({ namespace: { foo: true } }, true);
    _ReactObservableStore2.default.init({ namespace: { foo: true } }, false);
});

test('update store', function () {
    var result,
        value = false;
    result = _ReactObservableStore2.default.get('namespace');
    _ReactObservableStore2.default.update('namespace', { foo: value });
    result = _ReactObservableStore2.default.get('namespace.foo');
    expect(result).toBe(value);
    _ReactObservableStore2.default.update('namespace', { foo: value }, false);
    result = _ReactObservableStore2.default.get('namespace.foo');
    expect(result).toBe(value);
});

test('set and get from store', function () {
    _ReactObservableStore2.default.init({ namespace: { foo: { nested: true } } });
    var result,
        value = false;
    _ReactObservableStore2.default.set('namespace.foo.nested', value);
    result = _ReactObservableStore2.default.get('namespace.foo.nested');
    expect(result).toBe(value);
    result = _ReactObservableStore2.default.get('namespace.foo');
    expect(result).toEqual({ nested: value });
});

test('manual subscribe and unsubscribe', function (done) {
    var change = { foo: false };
    _ReactObservableStore2.default.init({ namespace: { foo: true } });
    var id = _ReactObservableStore2.default.subscribe('namespace', function upd(data) {
        expect(data).toEqual(change);
        _ReactObservableStore2.default.unsubscribe('namespace', id);
        done();
    });
    _ReactObservableStore2.default.update('namespace', change);
});

test('test withStore', function () {
    _ReactObservableStore2.default.init({ namespace: { foo: "bar" } });
    var TestComp = (0, _ReactObservableStore.withStore)('namespace', Component);
    expect(TestComp).toEqual(expect.any(Function));
});

test('render withStore', function () {
    _ReactObservableStore2.default.init({ namespace: { foo: "bar" } });
    var TestCompEmpty = (0, _ReactObservableStore.withStore)('empty', Component);
    var TestComp = (0, _ReactObservableStore.withStore)('namespace', Component);
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(TestComp, null));
    wrapper.unmount();
});

test('update observer', function () {
    _ReactObservableStore2.default.init({ namespace: { foo: "bar" } });
    var TestComp = (0, _ReactObservableStore.withStore)('namespace', Component);
    var result = (0, _enzyme.mount)(_react2.default.createElement(TestComp, null));
    _ReactObservableStore2.default.update('namespace', { foo: "baz" });
});