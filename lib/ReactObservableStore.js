'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _ObservableTrait = require('./ObservableTrait');

var _ObservableTrait2 = _interopRequireDefault(_ObservableTrait);

var _ObserverComponent = require('./ObserverComponent');

var _ObserverComponent2 = _interopRequireDefault(_ObserverComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Ensure singleton instance
 * @type {ReactObservableStore}
 */
var instance = null;

/**
 * The global state store
 * @return {Object} The global state store
 */

var ReactObservableStore = function () {

  /**
   * Create React Observable Store
   *
   * @return {ReactObservableStore} The instance
   */
  function ReactObservableStore() {
    _classCallCheck(this, ReactObservableStore);

    /**
     * Ensure no other instance than singleton
     *
     * @type {ReactObservableStore}
     */
    if (instance) return instance;

    /**
     * Show store on console
     *
     * @type {Boolean}
     */
    this.showLog = false;

    /**
     * The store
     *
     * @type {Store}
     */
    this.store = new _Store2.default();

    /**
     * Observable trait
     *
     * @type {ObservableTrait}
     */
    this.observable = new _ObservableTrait2.default();

    /**
     * Set singleton
     * @type {[type]}
     */
    instance = this;
    return instance;
  }

  /**
   * Log current storage
   */


  _createClass(ReactObservableStore, [{
    key: 'logging',
    value: function logging() {
      this.showLog && console && console.log('Store', this.store.getStorage());
    }

    /**
     * Initialize the store
     *
     * @param  {Object}  data        Initial data
     * @param  {Boolean} [log=false] Logging flag
     */

  }, {
    key: 'init',
    value: function init(data) {
      var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.store.init(data);
      for (var namespace in data) {
        this.observable.init(namespace);
      }this.showLog = log;
    }

    /**
     * Updates the store
     *
     * @param  {String}  namespace    The namespace to update
     * @param  {Object}  data         The data
     * @param  {Boolean} [merge=true] Update strategy
     */

  }, {
    key: 'update',
    value: function update(namespace, data) {
      var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      this.store.update(namespace, data, merge);
      this.observable.fire(namespace, this.store.get(namespace));
    }

    /**
     * Get store value
     *
     * @param  {String} key The key of value to get
     * @return {Mixed}      The value to return
     */

  }, {
    key: 'get',
    value: function get(key) {
      return this.store.get(key);
    }

    /**
     * Set store value
     *
     * @param {String} key   The key to store the value
     * @param {Mixed} value  The value to be stored
     */

  }, {
    key: 'set',
    value: function set(key, value) {
      this.store.set(key, value);
      var segments = key.split('.');
      this.observable.fire(segments[0], this.store.get(segments[0]));
    }

    /**
     * Subscribe to namespace
     *
     * @param  {String}   namespace The namespace to subscribe
     * @param  {Function} fn        The subscription callback
     * @return {String}             The observer id
     */

  }, {
    key: 'subscribe',
    value: function subscribe(namespace, fn) {
      return this.observable.subscribe(namespace, fn);
    }

    /**
     * Unsubscribe to namespace
     *
     * @param  {String} namespace The namespace to unsubscribe to
     * @param  {String} id        The observer id got from subsbribe method
     */

  }, {
    key: 'unsubscribe',
    value: function unsubscribe(namespace, id) {
      return this.observable.unsubscribe(namespace, id);
    }

    /**
     * Creates a wrapper around the component that will receive the storage data
     *
     * @param  {String}             namespace           The namespace to subscribe for updates
     * @param  {Component}          WrappedComponent    The new component
     * @return {Component}                              The resulting class
     */

  }, {
    key: 'withStore',
    value: function withStore(namespace, WrappedComponent) {

      /**
       * Keep reference to instance
       * @type {[type]}
       */
      var me = instance;

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
          store: me.store,
          subscribe: function subscribe(nsp, fn) {
            return me.subscribe(nsp, fn);
          },
          namespace: namespace,
          render: function render(output) {
            return _react2.default.createElement(WrappedComponent, output);
          }
        });
      };
    }
  }]);

  return ReactObservableStore;
}();

/**
 * Create singleton
 *
 * @type {ReactObservableStore}
 */


var Singleton = new ReactObservableStore();

// Export public API
var withStore = exports.withStore = Singleton.withStore;
exports.default = Singleton;