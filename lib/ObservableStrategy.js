'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ObserverComponent = require('./ObserverComponent');

var _ObserverComponent2 = _interopRequireDefault(_ObserverComponent);

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Observable trait
 * Implements the observer pattern being the subject
 * @return {Object} The global state store
 */
var ObservableStrategy = function () {

    /**
     * Create the observable mixin
     * @return {ObservableStrategy} [description]
     */
    function ObservableStrategy() {
        _classCallCheck(this, ObservableStrategy);

        /**
         * The observers
         * @type {Array}
         */
        this.observers = {};
    }

    /**
     * Init observers for namespace
     * @param  {String} namespace The namespace
     */


    _createClass(ObservableStrategy, [{
        key: 'init',
        value: function init(namespace) {
            this.observers[namespace] = {};
        }

        /**
         * Allow components to subscribe to store updates
         *
         * @param {String}   namespace  The namespace
         * @param {Function} fn         The component updater
         */

    }, {
        key: 'subscribe',
        value: function subscribe(namespace, fn) {
            if (!this.observers[namespace]) throw new Error('Invalid namespace');
            var id = ObservableStrategy.generateObserverId();
            this.observers[namespace][id] = fn;
            return id;
        }

        /**
         * Allow components to unsubscribe to store updates
         *
         * @param {String} namespace    The namespace
         * @param {String} id           The observer id
         */

    }, {
        key: 'unsubscribe',
        value: function unsubscribe(namespace, id) {
            this.observers[namespace] = (0, _lodash2.default)(this.observers[namespace], [id]);
        }

        /**
         * Call subscribers to store updates
         *
         * @param {String}  namespace   The namespace
         * @param {Object}  data        The event/data
         * @param {Boolean} thisObj     The context
         */

    }, {
        key: 'update',
        value: function update(namespace, data, thisObj) {
            var _this = this;

            var scope = thisObj || window;
            Object.keys(this.observers[namespace]).forEach(function (id) {
                _this.observers[namespace][id].call(scope, data);
            });
        }

        /**
         * Generate observer id
         * @return {String} The observer identifier
         */

    }, {
        key: 'register',


        /**
         * Register to namespace changes
         * @param  {String} namespace        [description]
         * @param  {Object} store            [description]
         * @param  {React.Component} WrappedComponent [description]
         * @return {Function}                  [description]
         */
        value: function register(namespace, store, WrappedComponent) {
            var _this2 = this;

            //var me = this;

            // Get component class name
            var name = WrappedComponent.prototype.constructor.displayName || WrappedComponent.prototype.constructor.name;

            /**
             * Returns the component wrapper
             * @type {Object}
             */
            return function (props) {
                return _react2.default.createElement(_ObserverComponent2.default, {
                    name: name,
                    input: props,
                    store: store,
                    subscribe: _this2.subscribe.bind(_this2),
                    unsubscribe: _this2.unsubscribe.bind(_this2),
                    namespace: namespace,
                    render: function render(output) {
                        return _react2.default.createElement(WrappedComponent, output);
                    }
                });
            };
        }
    }], [{
        key: 'generateObserverId',
        value: function generateObserverId() {
            return 'o_' + Math.random().toString(36).substring(2);
        }
    }]);

    return ObservableStrategy;
}();

// Export public API


exports.default = ObservableStrategy;