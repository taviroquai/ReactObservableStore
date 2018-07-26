import React from 'react';
import ObserverComponent from './ObserverComponent';
import omit from 'lodash-es/omit';

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
        if (!this.observers[namespace]) throw new Error('Invalid namespace to be subscribed');
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
        const scope = thisObj || window;
        Object.keys(this.observers[namespace]).forEach(id => {
            if (this.observers[namespace][id]) {
                this.observers[namespace][id].call(scope, data);
            }
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
     * Register component observer
     * @param  {String}             namespace   The namespace to be subscribed
     * @param  {Object}             store       The store containing the data
     * @param  {React.Component}    observer    The observer Component
     * @return {Function}                       The result
     */
    register(namespace, store, WrappedComponent) {

        if (!WrappedComponent || !this.isReactComponent(WrappedComponent)) {
            throw new Error('Invalid observer for React Observable Store');
        }

        // Get component class name
        const construct = WrappedComponent.prototype.constructor;
        const name = (construct.displayName || construct.name);

        /**
         * Returns the component wrapper
         * @type {Object}
         */
        return (props) => (
            <ObserverComponent
                name={name}
                input={props}
                store={store}
                subscribe={this.subscribe.bind(this)}
                unsubscribe={this.unsubscribe.bind(this)}
                namespace={namespace}
                render={(output) => <WrappedComponent {...output} />}
            />
        )
    }

    /**
     * Checks if the observer is a React.Component
     * 
     * @param {Function} observer 
     */
    isReactComponent(observer) {
        return !!observer.prototype.isReactComponent
            || !!observer.prototype.isPureReactComponent;
    }
}

// Export public API
export default ObservableStrategy;
