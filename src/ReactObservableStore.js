import React from 'react';
import Store from './Store';
import ObservableTrait from './ObservableTrait';
import ObserverComponent from './ObserverComponent';

/**
 * Ensure singleton instance
 * @type {ReactObservableStore}
 */
let instance = null;

/**
 * The global state store
 * @return {Object} The global state store
 */
class ReactObservableStore {

    /**
     * Create React Observable Store
     *
     * @return {ReactObservableStore} The instance
     */
    constructor() {

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
        this.store = new Store();

        /**
         * Observable trait
         *
         * @type {ObservableTrait}
         */
        this.observable = new ObservableTrait();

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
    logging() {
        this.showLog && console && console.log('Store', this.store.getStorage());
    }

    /**
     * Initialize the store
     *
     * @param  {Object}  data        Initial data
     * @param  {Boolean} [log=false] Logging flag
     */
    init(data, log = false) {
        this.store.init(data);
        for (let namespace in data) this.observable.init(namespace);
        this.showLog = log;
    }

    /**
     * Updates the store
     *
     * @param  {String}  namespace    The namespace to update
     * @param  {Object}  data         The data
     * @param  {Boolean} [merge=true] Update strategy
     */
    update(namespace, data, merge = true) {
        this.store.update(namespace, data, merge);
        this.observable.fire(namespace, this.store.get(namespace));
    }

    /**
     * Get store value
     *
     * @param  {String} key The key of value to get
     * @return {Mixed}      The value to return
     */
    get(key) {
        return this.store.get(key);
    }

    /**
     * Set store value
     *
     * @param {String} key   The key to store the value
     * @param {Mixed} value  The value to be stored
     */
    set(key, value) {
        this.store.set(key, value);
        const segments = key.split('.');
        this.observable.fire(segments[0], this.store.get(segments[0]));
    }

    /**
     * Subscribe to namespace
     *
     * @param  {String}   namespace The namespace to subscribe
     * @param  {Function} fn        The subscription callback
     * @return {String}             The observer id
     */
    subscribe(namespace, fn) {
        return this.observable.subscribe(namespace, fn);
    }

    /**
     * Unsubscribe to namespace
     *
     * @param  {String} namespace The namespace to unsubscribe to
     * @param  {String} id        The observer id got from subsbribe method
     */
    unsubscribe(namespace, id) {
        return this.observable.unsubscribe(namespace, id);
    }

    /**
     * Creates a wrapper around the component that will receive the storage data
     *
     * @param  {String}             namespace           The namespace to subscribe for updates
     * @param  {Component}          WrappedComponent    The new component
     * @return {Component}                              The resulting class
     */
    withStore(namespace, WrappedComponent) {

        /**
         * Keep reference to instance
         * @type {[type]}
         */
        var me = instance;

        // Get component class name
        var name = (WrappedComponent.prototype.constructor.displayName
            || WrappedComponent.prototype.constructor.name);

        /**
         * Returns the component wrapper
         * @type {Object}
         */
        return (props) => (
            <ObserverComponent
                name={name}
                input={props}
                store={me.store}
                subscribe={(nsp, fn) => me.subscribe(nsp, fn)}
                namespace={namespace}
                render={(output) => <WrappedComponent {...output} />}
            />
        )
    }
}

/**
 * Create singleton
 *
 * @type {ReactObservableStore}
 */
const Singleton = new ReactObservableStore();

// Export public API
export const withStore = Singleton.withStore;
export default Singleton;
