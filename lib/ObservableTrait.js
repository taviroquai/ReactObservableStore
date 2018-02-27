'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Observable trait
 * Implements the observer pattern being the subject
 * @return {Object} The global state store
 */
var ObservableTrait = function () {

  /**
   * Create the observable mixin
   * @return {ObservableTrait} [description]
   */
  function ObservableTrait() {
    _classCallCheck(this, ObservableTrait);

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


  _createClass(ObservableTrait, [{
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
      var id = ObservableTrait.generateObserverId();
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
    key: 'fire',
    value: function fire(namespace, data, thisObj) {
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

  }], [{
    key: 'generateObserverId',
    value: function generateObserverId() {
      return 'o_' + Math.random().toString(36).substring(2);
    }
  }]);

  return ObservableTrait;
}();

// Export public API


exports.default = ObservableTrait;