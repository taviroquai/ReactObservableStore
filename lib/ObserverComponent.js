'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var assign = require('lodash.assign');

/**
 * The observer component
 * @type {Object}
 */

var ObserverComponent = (function (_React$Component) {
    _inherits(ObserverComponent, _React$Component);

    /**
     * Observer constructor
     * @param  {Object} props       Initialized ptops
     * @return {React.component}    The component instance
     */

    function ObserverComponent(props) {
        _classCallCheck(this, ObserverComponent);

        _get(Object.getPrototypeOf(ObserverComponent.prototype), 'constructor', this).call(this, props);

        // Creates the merged data
        this.output = assign({}, props.storage[this.props.namespace]);
        this.output = assign(this.output, props.sanitizeData(props.input));
    }

    /**
     * On component mount, subscribe to store updates
     * @return {Boolean} The react result
     */

    _createClass(ObserverComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this;
            this.id = this.props.subscribe(this.props.namespace, function upd(data) {
                me.update(data);
            });
        }

        /**
         * Update component state with new props
         * @param  {Object} nextProps The next props that will be received
         */
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.update(nextProps.input);
        }

        /**
         * Unsubscribe observers of components that will unmount
         */
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.unsubscribe(this.props.namespace, this.id);
        }

        /**
         * Update component state
         * @param  {Object} data The data to be updated
         */
    }, {
        key: 'update',
        value: function update(data) {
            var merge = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            this.output = merge ? assign(this.output, this.props.sanitizeData(data)) : this.props.sanitizeData(data);

            // Delegate updates to wrapped component
            this.forceUpdate();
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
            return React.createElement(this.props.component, this.output);
        }
    }]);

    return ObserverComponent;
})(React.Component);

;

exports['default'] = ObserverComponent;
module.exports = exports['default'];