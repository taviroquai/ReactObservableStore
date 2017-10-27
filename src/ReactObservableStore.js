/*
var React = require('react');
var ReactObservableStore = React.createClass({
	render () {
		return <div>react-observable-store</div>;
	}
});
export default ReactObservableStore;
*/

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
const Store = (function () {

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
    function updateStore(data, merge = true) {
        storage = merge ? assign(storage, sanitizeData(data))
            : assign({}, sanitizeData(data));
        showLog && console && console.log('Store', storage);
        fire('update', storage);
    };

    /**
     * Method to init the storage
     * TODO: can be overriden
     * @param  {Object} data The initial data to be stored
     */
    function init(data, log = false) {
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
    function unsubscribe(eventName, id) {
        observers[eventName] = omit(observers[eventName], [id]);
    };

    /**
     * Call subscribers to store updates
     * @param  {Object}  o       The event/data
     * @param  {Boolean} thisObj The context
     */
    function fire(eventName, o, thisObj) {
        var scope = thisObj || window;
        Object.keys(observers[eventName]).forEach((id) => {
            observers[eventName][id].call(scope, o);
        });
    };

    /**
     * Creates a wrapper around the component that will receive the storage data
     * @param  {React.Component} WrappedComponent  The new component
     * @return {class}                              The resulting class
     */
    const createObserver = (WrappedComponent) => {

        /**
         * Returns the component wrapper
         * @type {Object}
         */
        return class extends React.Component {
            constructor(props) {
                super(props);

                // Bind own methods
                this.unsubscribe = this.unsubscribe.bind(this);

                // Create component instance identifier
                this.name = WrappedComponent.prototype.constructor.name
                    + '_' + Math.random().toString(36).substring(2);

                // Creates the merged data
                this.merged = assign({}, storage);
                this.merged = assign(this.merged, sanitizeData(props));
            }

            /**
             * On component mount, subscribe to store updates
             * @return {Boolean} The react result
             */
            componentDidMount() {
                var me = this;
                subscribe('update', this.name, function updater(data) { me.update(data); });
            }

            /**
             * Update component state with new props
             * @param  {[type]} nextProps [description]
             * @return {[type]}           [description]
             */
            componentWillReceiveProps(nextProps) {
                this.update(nextProps);
            }

            /**
             * Unsubscribe observers of components that will unmount
             */
            componentWillUnmount() {
                unsubscribe('update', this.name);
            }

            /**
             * Update component state
             * @param  {Object} data The data to be updated
             */
            update(data, merge = true) {
                this.merged = merge ? assign(this.merged, sanitizeData(data))
                    : sanitizeData(data);

                // Delegate updates to wrapped component
                this.forceUpdate();
            }

            /**
             * Allows the component to unsubscribe to store updates
             */
            unsubscribe() {
                unsubscribe((data) => this.update(data));
            }

            /**
             * Renders the wrapper
             * Allows the component to access the store update method
             * and to unsubscribe to store store updates
             * @return {String} The JSX string to be rendered by ReactDOM
             */
            render() {
                return (<WrappedComponent {...this.merged}
                    unsubscribe={unsubscribe}
                />);
            }
        };
    };

    /**
     * The public API methods
     * @type {Object}
     */
    return {

        // Initialize the store
        init: (props, log = false) => {
            init(props, log);
        },

        // Wraps the component with the store method
        withStore: (component) => {
            return createObserver(component);
        },

        // Updates the store
        update: (props) => {
            updateStore(props);
        },

        // Get the storage data as a cloned Object
        get: () => {
            return Object.assign({}, storage);
        }
    };
})();

// Export public API
export const withStore = Store.withStore;
export default Store;
