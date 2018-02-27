'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.set');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.get');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.assign');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.clonedeep');

var _lodash8 = _interopRequireDefault(_lodash7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The global state store
 * @return {Object} The global state store
 */
var Store = function () {

  /**
   * Create new store
   *
   * @param  {Object} [storage={}] [description]
   * @return {Store}              [description]
   */
  function Store() {
    var storage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Store);

    /**
     * The private storage
     * @type {Object}
     */
    this.storage = (0, _lodash8.default)(storage);
  }

  /**
   * Sanitize allowed data to be stored, ie. only plain JS objects allowed
   * @param  {Object} data The data to be stored
   * @return {Object}      The sanitized data
   */


  _createClass(Store, [{
    key: 'init',


    /**
     * Method to init the storage
     *
     * @param {String} namespace   The namespace
     * @param {Object} data        The initial data to be stored
     */
    value: function init(data) {
      if (!data) throw new Error('Invalid store initialization');
      this.storage = (0, _lodash6.default)({}, Store.sanitizeData(data));
    }

    /**
     * Method to update the storage data
     *
     * @param {String} namespace    The namespace
     * @param {Object} data         The data to be stored
     * @param {Boolean} merge       The update method: merge or override
     */

  }, {
    key: 'update',
    value: function update(namespace, data) {
      var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!this.storage[namespace]) throw new Error('Invalid namespace');
      var update = merge ? this.storage[namespace] : {};
      this.storage[namespace] = (0, _lodash6.default)(update, Store.sanitizeData(data));
    }

    /**
     * Get nested value
     * @param  {String} key The nested key
     * @return {Mixed}      The result
     */

  }, {
    key: 'get',
    value: function get(key) {
      var segments = key.split('.');
      var result = (0, _lodash4.default)(this.storage, key, null);
      return result === Object(result) ? (0, _lodash6.default)({}, result) : result;
    }

    /**
     * Set nested value
     * @param  {String} key     The nested key
     * @param  {Mixed}  value   The value to be set
     */

  }, {
    key: 'set',
    value: function set(key, value) {
      (0, _lodash2.default)(this.storage, key, Store.sanitizeData(value));
    }
  }], [{
    key: 'sanitizeData',
    value: function sanitizeData(data) {
      return (0, _lodash8.default)(JSON.parse(JSON.stringify(data)));
    }
  }]);

  return Store;
}();

// Export public API


exports.default = Store;