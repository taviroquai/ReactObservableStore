import set from 'lodash.set';
import get from 'lodash.get';
import assign from 'lodash.assign';
import clone from 'lodash.clonedeep';

/**
 * The global state store
 * @return {Object} The global state store
 */
class Store {

    /**
     * Create new store
     *
     * @param  {Object} [storage={}] [description]
     * @return {Store}              [description]
     */
    constructor(storage = {}, log = false) {

        /**
         * The private storage
         * @type {Object}
         */
        this.storage = clone(storage);

        /**
         * Show store on console
         *
         * @type {Boolean}
         */
        this.showLog = log;
    }

    /**
     * Sanitize allowed data to be stored, ie. only plain JS objects allowed
     * @param  {Object} data The data to be stored
     * @return {Object}      The sanitized data
     */
    static sanitizeData(data) {
        return clone(JSON.parse(JSON.stringify(data)));
    }

    /**
     * Log current storage
     */
    logging() {
        if (this.showLog && console) console.log('Store', this.storage);
    }

    /**
     * Method to init the storage
     *
     * @param {String} namespace   The namespace
     * @param {Object} data        The initial data to be stored
     */
    init(data, log = false) {
        this.showLog = log;
        if (!data) throw new Error('Invalid store initialization');
        this.storage = assign({}, Store.sanitizeData(data));
    }

    add(namespace, data) {
        if (this.storage[namespace]) throw new Error('Namespace exists');
        this.storage[namespace] = assign({}, Store.sanitizeData(data[namespace]));
        this.logging();
    }

    /**
     * Method to update the storage data
     *
     * @param {String} namespace    The namespace
     * @param {Object} data         The data to be stored
     * @param {Boolean} merge       The update method: merge or override
     */
    update(namespace, data, merge = true) {
        if (!this.storage[namespace]) throw new Error('Invalid namespace');
        const update = merge ? this.storage[namespace] : {};
        this.storage[namespace] = assign(update, Store.sanitizeData(data));
        this.logging();
    }

    /**
     * Get nested value
     * @param  {String} key The nested key
     * @return {Mixed}      The result
     */
    get(key) {
        const segments = key.split('.');
        const result = get(this.storage, key, null);
        return result;
    }

    /**
     * Set nested value
     * @param  {String} key     The nested key
     * @param  {Mixed}  value   The value to be set
     */
    set(key, value) {
        set(this.storage, key, Store.sanitizeData(value));
        this.logging();
    }
}

// Export public API
export default Store;
