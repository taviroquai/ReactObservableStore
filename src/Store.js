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
    constructor(storage = {}) {

        /**
         * The private storage
         * @type {Object}
         */
        this.storage = clone(storage);
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
     * Method to init the storage
     *
     * @param {String} namespace   The namespace
     * @param {Object} data        The initial data to be stored
     */
    init(data) {
        if (!data) throw new Error('Invalid store initialization');
        this.storage = assign({}, Store.sanitizeData(data));
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
    }

    /**
     * Get nested value
     * @param  {String} key The nested key
     * @return {Mixed}      The result
     */
    get(key) {
        const segments = key.split('.');
        const result = get(this.storage, key, null);
        return result === Object(result) ? assign({}, result) : result;
    }

    /**
     * Set nested value
     * @param  {String} key     The nested key
     * @param  {Mixed}  value   The value to be set
     */
    set(key, value) {
        set(this.storage, key, Store.sanitizeData(value));
    }
}

// Export public API
export default Store;
