'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var React = require('react');
var assign = require('lodash.assign');
var clone = require('lodash.clonedeep');
var omit = require('lodash.omit');
var ObserverComponent = require('./ObserverComponent');

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
var Store = (function () {

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
        return clone(JSON.parse(JSON.stringify(data)));
    }

    /**
     * Method to update the storage data
     *
     * @param {String} namespace    The namespace
     * @param {Object} data         The data to be stored
     * @param {Boolean} merge       The update method: merge or override
     */
    function updateStore(namespace, data) {
        var merge = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

        storage[namespace] = storage[namespace] || {};
        observers[namespace] = observers[namespace] || {};
        storage[namespace] = merge ? assign(storage[namespace], sanitizeData(data)) : assign({}, sanitizeData(data));
        logging();
        fire(namespace, storage[namespace]);
    };

    /**
     * Method to init the storage
     *
     * @param {String} namespace   The namespace
     * @param {Object} data        The initial data to be stored
     */
    function _init(data) {
        var log = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        showLog = log;
        storage = assign({}, sanitizeData(data));
        logging();
    };

    /**
     * Get nested value
     * @param  {String} key The nested key
     * @return {Mixed}      The result
     */
    function getNested(key) {
        var segments = key.split('.');
        var result = storage;
        segments.forEach(function (item) {
            result = result[item];
        });
        return result === Object(result) ? assign({}, result) : result;
    }

    /**
     * Allow components to subscribe to store updates
     *
     * @param {String}   namespace  The namespace
     * @param {Function} fn         The component updater
     */
    function _subscribe(namespace, fn) {
        var id = generateObserverId();
        observers[namespace] = observers[namespace] || {};
        observers[namespace][id] = fn;
        return id;
    };

    /**
     * Allow components to unsubscribe to store updates
     *
     * @param {String} namespace    The namespace
     * @param {String} id           The observer id
     */
    function _unsubscribe(namespace, id) {
        observers[namespace] = omit(observers[namespace], [id]);
    };

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
    };

    /**
     * Creates a wrapper around the component that will receive the storage data
     *
     * @param  {String}             namesapce           The namespace to subscribe for updates
     * @param  {React.Component}    WrappedComponent    The new component
     * @param  {Array}              notifications       The list of notifications to listen for
     * @return {React.Component}                        The resulting class
     */
    var createObserver = function createObserver(namespace, WrappedComponent) {
        var notifications = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

        // Get component class name
        var name = WrappedComponent.prototype.constructor.displayName || WrappedComponent.prototype.constructor.name;

        /**
         * Returns the component wrapper
         * @type {Object}
         */
        return function (props) {
            return React.createElement(ObserverComponent, {
                name: name,
                input: props,
                storage: storage,
                sanitizeData: sanitizeData,
                subscribe: _subscribe,
                unsubscribe: _unsubscribe,
                namespace: namespace,
                notifications: notifications,
                component: WrappedComponent
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
            var log = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            _init(data, log);
        },

        // Wraps the component with the store method
        withStore: function withStore(namespace, component) {
            return createObserver(namespace, component);
        },

        // Updates the store
        update: function update(namespace, props) {
            updateStore(namespace, props);
        },

        // Get a nested storage value by key
        // Levels separated by (.) dots
        get: function get(key) {
            return getNested(key);
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
})();

// Export public API
var withStore = Store.withStore;
exports.withStore = withStore;
exports['default'] = Store;