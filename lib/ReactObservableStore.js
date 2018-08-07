'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withStore = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _ObservableStrategy = require('./ObservableStrategy');

var _ObservableStrategy2 = _interopRequireDefault(_ObservableStrategy);

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

var ReactStore = function () {

  /**
   * Create React Store
   *
   * @return {ReactStore} The instance
   */
  function ReactStore(strategy) {
    _classCallCheck(this, ReactStore);

    /**
     * Ensure no other instance than singleton
     *
     * @type {ReactStore}
     */
    if (instance) return instance;

    /**
     * The store
     *
     * @type {Store}
     */
    this.store = new _Store2.default();

    /**
     * Observable trait
     *
     * @type {ObservableStrategy}
     */
    this.strategy = strategy;

    /**
     * Set singleton
     * @type {ReactStore}
     */
    instance = this;
    return instance;
  }

  /**
   * Initialize the store
   *
   * @param  {Object}  data        Initial data
   * @param  {Boolean} [log=false] Logging flag
   */


  _createClass(ReactStore, [{
    key: 'init',
    value: function init(data) {
      var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.store.init(data, log);
      console.log('INIT', data);
      for (var namespace in data) {
        this.strategy.init(namespace);
      }
    }
  }, {
    key: 'add',
    value: function add(namespace, data) {
      console.log('ADD', namespace, data);
      this.store.add(namespace, data);
      this.strategy.init(namespace);
      console.log('ADD DONE', this.store.storage);
      //this.strategy.update(namespace, this.store.get(namespace));
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
      this.strategy.update(namespace, data);
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
      var namespace = segments[0];
      this.strategy.update(namespace, this.store.get(namespace));
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
      return this.strategy.subscribe(namespace, fn);
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
      return this.strategy.unsubscribe(namespace, id);
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
      return instance.strategy.register(namespace, instance.store, WrappedComponent);
    }
  }]);

  return ReactStore;
}();

/**
 * Create singleton
 *
 * @type {ReactObservableStore}
 */


var ReactObservableStore = new ReactStore(new _ObservableStrategy2.default());

// Export public API
var withStore = exports.withStore = ReactObservableStore.withStore;
exports.default = ReactObservableStore;