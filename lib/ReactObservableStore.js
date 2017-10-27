/*
var React = require('react');
var ReactObservableStore = React.createClass({
	render () {
		return <div>react-observable-store</div>;
	}
});
export default ReactObservableStore;
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var assign = require('lodash.assign');
var clone = require('lodash.clonedeep');
var omit = require('lodash.omit');

/**
 * Example of usage in top level application:
 *  import Store from './Store';
 *  Store({ foo: 'bar' });
 *
 * Example of usage in sub level component, ie. similar to redux connect usage:
 *  import { withStore } from './Store';
 *  class MyComponent extends React.Component {};
 *  export default withStore(MyComponent);
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
    var observers = {
        'update': {}
    };

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
     * @param  {Object} data The data to be stored
     */
    function updateStore(data) {
        var merge = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        storage = merge ? assign(storage, sanitizeData(data)) : assign({}, sanitizeData(data));
        showLog && console && console.log('Store', storage);
        fire('update', storage);
    };

    /**
     * Method to init the storage
     * TODO: can be overriden
     * @param  {Object} data The initial data to be stored
     */
    function _init(data) {
        var log = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        showLog = log;
        updateStore(data);
    };

    /**
     * Allow components to subscribe to store updates
     * @param  {eventName}  eventName   The event name
     * @param  {id}         The observer id
     * @param  {Function} fn The component updater
     */
    function subscribe(eventName, id, fn) {
        observers[eventName][id] = fn;
    };

    /**
     * Allow components to unsubscribe to store updates
     * @param  {eventName}  eventName    The event name
     * @param  {id}         The observer id
     */
    function _unsubscribe(eventName, id) {
        observers[eventName] = omit(observers[eventName], [id]);
    };

    /**
     * Call subscribers to store updates
     * @param  {Object}  o       The event/data
     * @param  {Boolean} thisObj The context
     */
    function fire(eventName, o, thisObj) {
        var scope = thisObj || window;
        Object.keys(observers[eventName]).forEach(function (id) {
            observers[eventName][id].call(scope, o);
        });
    };

    /**
     * Creates a wrapper around the component that will receive the storage data
     * @param  {React.Component} WrappedComponent  The new component
     * @return {class}                              The resulting class
     */
    var createObserver = function createObserver(WrappedComponent) {

        /**
         * Returns the component wrapper
         * @type {Object}
         */
        return (function (_React$Component) {
            _inherits(_class, _React$Component);

            function _class(props) {
                _classCallCheck(this, _class);

                _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props);

                // Bind own methods
                this.unsubscribe = this.unsubscribe.bind(this);

                // Create component instance identifier
                this.name = WrappedComponent.prototype.constructor.name + '_' + Math.random().toString(36).substring(2);

                // Creates the merged data
                this.merged = assign({}, storage);
                this.merged = assign(this.merged, sanitizeData(props));
            }

            /**
             * On component mount, subscribe to store updates
             * @return {Boolean} The react result
             */

            _createClass(_class, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var me = this;
                    subscribe('update', this.name, function updater(data) {
                        me.update(data);
                    });
                }

                /**
                 * Update component state with new props
                 * @param  {[type]} nextProps [description]
                 * @return {[type]}           [description]
                 */
            }, {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.update(nextProps);
                }

                /**
                 * Unsubscribe observers of components that will unmount
                 */
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    _unsubscribe('update', this.name);
                }

                /**
                 * Update component state
                 * @param  {Object} data The data to be updated
                 */
            }, {
                key: 'update',
                value: function update(data) {
                    var merge = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

                    this.merged = merge ? assign(this.merged, sanitizeData(data)) : sanitizeData(data);

                    // Delegate updates to wrapped component
                    this.forceUpdate();
                }

                /**
                 * Allows the component to unsubscribe to store updates
                 */
            }, {
                key: 'unsubscribe',
                value: function unsubscribe() {
                    var _this = this;

                    _unsubscribe(function (data) {
                        return _this.update(data);
                    });
                }

                /**
                 * Renders the wrapper
                 * Allows the component to access the store update method
                 * and to unsubscribe to store store updates
                 * @return {String} The JSX string to be rendered by ReactDOM
                 */
            }, {
                key: 'render',
                value: function render() {
                    return React.createElement(WrappedComponent, _extends({}, this.merged, {
                        unsubscribe: _unsubscribe
                    }));
                }
            }]);

            return _class;
        })(React.Component);
    };

    /**
     * The public API methods
     * @type {Object}
     */
    return {

        // Initialize the store
        init: function init(props) {
            var log = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            _init(props, log);
        },

        // Wraps the component with the store method
        withStore: function withStore(component) {
            return createObserver(component);
        },

        // Updates the store
        update: function update(props) {
            updateStore(props);
        },

        // Get the storage data as a cloned Object
        get: function get() {
            return _extends({}, storage);
        }
    };
})();

// Export public API
var withStore = Store.withStore;
exports.withStore = withStore;
exports['default'] = Store;