'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.withStore = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.set');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.get');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.assign');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.clonedeep');

var _lodash8 = _interopRequireDefault(_lodash7);

var _lodash9 = require('lodash.omit');

var _lodash10 = _interopRequireDefault(_lodash9);

var _ObserverComponent = require('./ObserverComponent');

var _ObserverComponent2 = _interopRequireDefault(_ObserverComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Example of usage in top level application:
 *  import Store from 'react-observable-store';
 *  Store.init({ namespace: {foo: 'bar' }}, true);
 *
 * Example of usage in sub level component, ie. similar to redux connect usage:
 *  import { withStore } from 'react-observable-store';
 *  class MyComponent extends React.Component {};
 *  export default withStore('namespace', MyComponent);
 *
 * After this, the store data can be used in component like as any other props:
 *  <p>{ this.props.foo }</p>
 */

/**
 * The global state store
 * @return {Object} The global state store
 */
var Store = function () {

    /**
     * The private storage
     * @type {Object}
     */
    var storage = {};

    /**
     * Show store on console
     * @type {Boolean}
     */
    var showLog = false;

    /**
     * The store observers
     * @type {Array}
     */
    var observers = {};

    /**
     * Log current storage
     */
    function logging() {
        showLog && console && console.log('Store', storage);
    }

    /**
     * Sanitize allowed data to be stored, ie. only plain JS objects allowed
     * @param  {Object} data The data to be stored
     * @return {Object}      The sanitized data
     */
    function sanitizeData(data) {
        return (0, _lodash8.default)(JSON.parse(JSON.stringify(data)));
    }

    /**
     * Method to update the storage data
     *
     * @param {String} namespace    The namespace
     * @param {Object} data         The data to be stored
     * @param {Boolean} merge       The update method: merge or override
     */
    function updateStore(namespace, data) {
        var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (!storage[namespace]) throw new Error('Invalid namespace');
        storage[namespace] = (0, _lodash6.default)(merge ? storage[namespace] : {}, sanitizeData(data));
        logging();
        fire(namespace, storage[namespace]);
    }

    /**
     * Method to init the storage
     *
     * @param {String} namespace   The namespace
     * @param {Object} data        The initial data to be stored
     */
    function _init(data) {
        var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        showLog = log;
        if (!data) throw new Error('Invalid store initialization');
        storage = (0, _lodash6.default)({}, sanitizeData(data));
        for (var namespace in storage) {
            observers[namespace] = {};
        }logging();
    }

    /**
     * Get nested value
     * @param  {String} key The nested key
     * @return {Mixed}      The result
     */
    function getNested(key) {
        var segments = key.split('.');
        var result = (0, _lodash4.default)(storage, key, null);
        return result === Object(result) ? (0, _lodash6.default)({}, result) : result;
    }

    /**
     * Set nested value
     * @param  {String} key     The nested key
     * @param  {Mixed}  value   The value to be set
     */
    function setNested(key, value) {
        var segments = key.split('.');
        (0, _lodash2.default)(storage, key, sanitizeData(value));
        logging();
        fire(segments[0], storage[segments[0]]);
    }

    /**
     * Allow components to subscribe to store updates
     *
     * @param {String}   namespace  The namespace
     * @param {Function} fn         The component updater
     */
    function _subscribe(namespace, fn) {
        var id = generateObserverId();
        if (!observers[namespace]) throw new Error('Invalid namespace');
        observers[namespace][id] = fn;
        return id;
    }

    /**
     * Allow components to unsubscribe to store updates
     *
     * @param {String} namespace    The namespace
     * @param {String} id           The observer id
     */
    function _unsubscribe(namespace, id) {
        observers[namespace] = (0, _lodash10.default)(observers[namespace], [id]);
    }

    /**
     * Generate observer id
     * @return {String} The observer identifier
     */
    function generateObserverId() {
        return 'o_' + Math.random().toString(36).substring(2);
    }

    /**
     * Call subscribers to store updates
     *
     * @param {String}  namespace   The namespace
     * @param {Object}  data        The event/data
     * @param {Boolean} thisObj     The context
     */
    function fire(namespace, data, thisObj) {
        var scope = thisObj || window;
        Object.keys(observers[namespace]).forEach(function (id) {
            observers[namespace][id].call(scope, data);
        });
    }

    /**
     * Creates a wrapper around the component that will receive the storage data
     *
     * @param  {String}             namesapce           The namespace to subscribe for updates
     * @param  {React.Component}    WrappedComponent    The new component
     * @return {React.Component}                        The resulting class
     */
    var createObserver = function createObserver(namespace, WrappedComponent) {

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
                storage: storage,
                sanitizeData: sanitizeData,
                subscribe: _subscribe,
                unsubscribe: _unsubscribe,
                namespace: namespace,
                render: function render(output) {
                    return _react2.default.createElement(WrappedComponent, output);
                }
            });
        };
    };

    /**
     * The public API methods
     * @type {Object}
     */
    return {

        // Initialize the store
        init: function init(data) {
            var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            _init(data, log);
        },

        // Wraps the component with the store method
        withStore: function withStore(namespace, component) {
            return createObserver(namespace, component);
        },

        // Updates the store
        update: function update(namespace, props) {
            var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            updateStore(namespace, props, merge);
        },

        // Get a nested storage value by key. Levels separated by (.) dots
        get: function get(key) {
            return getNested(key);
        },

        // Set a nested storage value by key. Levels separated by (.) dots
        set: function set(key, value) {
            setNested(key, value);
        },

        /**
         * Subscribe to namespace
         * @param  {String}   namespace The namespace to subscribe
         * @param  {Function} fn        The subscription callback
         * @return {String}             The observer id
         */
        subscribe: function subscribe(namespace, fn) {
            return _subscribe(namespace, fn);
        },

        /**
         * Unsubscribe to namespace
         * @param  {String} namespace The namespace to unsubscribe to
         * @param  {String} id        The observer id got from subsbribe method
         */
        unsubscribe: function unsubscribe(namespace, id) {
            return _unsubscribe(namespace, id);
        }
    };
}();

// Export public API
var withStore = exports.withStore = Store.withStore;
exports.default = Store;