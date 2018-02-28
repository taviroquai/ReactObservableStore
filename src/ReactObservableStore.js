import Store from './Store';
import ObservableStrategy from './ObservableStrategy';

/**
 * Ensure singleton instance
 * @type {ReactObservableStore}
 */
let instance = null;

/**
 * The global state store
 * @return {Object} The global state store
 */
class ReactStore {

    /**
     * Create React Store
     *
     * @return {ReactStore} The instance
     */
    constructor(strategy) {

        /**
         * Ensure no other instance than singleton
         *
         * @type {ReactStore}
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
        for (let namespace in data) this.strategy.init(namespace);
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
        this.strategy.update(namespace, data);
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
        const namespace = segments[0];
        this.strategy.update(namespace, this.store.get(namespace));
    }

    /**
     * Subscribe to namespace
     *
     * @param  {String}   namespace The namespace to subscribe
     * @param  {Function} fn        The subscription callback
     * @return {String}             The observer id
     */
    subscribe(namespace, fn) {
        return this.strategy.subscribe(namespace, fn);
    }

    /**
     * Unsubscribe to namespace
     *
     * @param  {String} namespace The namespace to unsubscribe to
     * @param  {String} id        The observer id got from subsbribe method
     */
    unsubscribe(namespace, id) {
        return this.strategy.unsubscribe(namespace, id);
    }

    /**
     * Creates a wrapper around the component that will receive the storage data
     *
     * @param  {String}             namespace           The namespace to subscribe for updates
     * @param  {Component}          WrappedComponent    The new component
     * @return {Component}                              The resulting class
     */
    withStore(namespace, WrappedComponent) {
        return instance.strategy.register(namespace, instance.store, WrappedComponent);
    }
}

/**
 * Create singleton
 *
 * @type {ReactObservableStore}
 */
const ReactObservableStore = new ReactStore(new ObservableStrategy());

// Export public API
export const withStore = ReactObservableStore.withStore;
export default ReactObservableStore;
