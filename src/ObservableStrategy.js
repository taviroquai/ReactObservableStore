import React from 'react';
import ObserverComponent from './ObserverComponent';
import omit from 'lodash.omit';

/**
 * Observable trait
 * Implements the observer pattern being the subject
 * @return {Object} The global state store
 */
class ObservableStrategy {

    /**
     * Create the observable mixin
     * @return {ObservableStrategy} [description]
     */
    constructor() {

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
    init(namespace) {
        this.observers[namespace] = {};
    }

    /**
     * Allow components to subscribe to store updates
     *
     * @param {String}   namespace  The namespace
     * @param {Function} fn         The component updater
     */
    subscribe(namespace, fn) {
        if (!this.observers[namespace]) throw new Error('Invalid namespace');
        const id = ObservableStrategy.generateObserverId();
        this.observers[namespace][id] = fn;
        return id;
    }

    /**
     * Allow components to unsubscribe to store updates
     *
     * @param {String} namespace    The namespace
     * @param {String} id           The observer id
     */
    unsubscribe(namespace, id) {
        this.observers[namespace] = omit(this.observers[namespace], [id]);
    }

    /**
     * Call subscribers to store updates
     *
     * @param {String}  namespace   The namespace
     * @param {Object}  data        The event/data
     * @param {Boolean} thisObj     The context
     */
    update(namespace, data, thisObj) {
        var scope = thisObj || window;
        Object.keys(this.observers[namespace]).forEach((id) => {
            this.observers[namespace][id].call(scope, data);
        });
    }

    /**
     * Generate observer id
     * @return {String} The observer identifier
     */
    static generateObserverId() {
        return 'o_' + Math.random().toString(36).substring(2);
    }

    /**
     * Register to namespace changes
     * @param  {String} namespace        [description]
     * @param  {Object} store            [description]
     * @param  {React.Component} WrappedComponent [description]
     * @return {Function}                  [description]
     */
    register(namespace, store, WrappedComponent) {

        //var me = this;

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
                store={store}
                subscribe={(nsp, fn) => this.subscribe(nsp, fn)}
                unsubscribe={(nsp, fn) => this.unsubscribe(nsp, fn)}
                namespace={namespace}
                render={(output) => <WrappedComponent {...output} />}
            />
        )
    }
}

// Export public API
export default ObservableStrategy;
