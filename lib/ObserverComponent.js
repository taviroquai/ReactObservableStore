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

        // Creates the merged data
        var _this = _possibleConstructorReturn(this, (ObserverComponent.__proto__ || Object.getPrototypeOf(ObserverComponent)).call(this, props));

        _this.output = assign({}, props.storage[_this.props.namespace]);
        _this.output = assign(_this.output, props.sanitizeData(props.input));
        return _this;
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
            var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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
            return this.props.render(this.output);
        }
    }]);

    return ObserverComponent;
}(React.Component);

;

exports.default = ObserverComponent;