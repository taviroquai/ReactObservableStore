'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var assign = require('lodash.assign');

/**
 * The observer component
 * @type {Object}
 */

var ObserverComponent = function (_React$Component) {
    _inherits(ObserverComponent, _React$Component);

    /**
     * Observer constructor
     * @param  {Object} props       Initialized ptops
     * @return {React.component}    The component instance
     */
    function ObserverComponent(props) {
        _classCallCheck(this, ObserverComponent);

        // Track isMounted locally
        var _this = _possibleConstructorReturn(this, (ObserverComponent.__proto__ || Object.getPrototypeOf(ObserverComponent)).call(this, props));

        _this._isMounted = false;

        // Queue for batch updates
        _this._queue = [];

        // Set initial state
        _this.state = assign({}, props.store.get(props.namespace));

        // Subscribe to store
        var me = _this;
        me.id = props.subscribe(props.namespace, function upd(data) {
            me.update(data);
        });
        return _this;
    }

    /**
     * Update component state
     * @param {Object}  data  The data to be updated
     * @param {Boolean} merge Flag to merge with current state
     */


    _createClass(ObserverComponent, [{
        key: 'update',
        value: function update(data) {
            var newState = assign(this.state, data);
            if (this._isMounted) this.setState(newState);else this._queue.push(newState);
        }
    }, {
        key: 'flushUpdates',
        value: function flushUpdates() {
            if (this._queue.length) {
                var newState = {};
                this._queue.map(function (state) {
                    return newState = assign(newState, state);
                });
                this.setState(newState);
                this._queue.splice(0, this._queue.length);
            }
        }

        /**
         * On component did mount, set _isMounted
         * @return {Boolean} The react result
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._isMounted = true;
            this.flushUpdates();
        }

        /**
         * Unsubscribe observers of components that will unmount
         */

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._isMounted = false;
            this.props.unsubscribe(this.props.namespace, this.id);
        }

        /**
         * Renders the wrapped component
         * @return {String} The JSX string to be rendered by ReactDOM
         */

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                store = _props.store,
                namespace = _props.namespace;

            var output = assign({}, this.props.input);
            output = assign(output, store.get(namespace));
            return this.props.render(output);
        }
    }]);

    return ObserverComponent;
}(React.Component);

;

exports.default = ObserverComponent;