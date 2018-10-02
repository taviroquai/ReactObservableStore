import React from 'react';
import assign from 'lodash-es/assign';

/**
 * The observer component
 * @type {Object}
 */
class ObserverComponent extends React.Component {

    /**
     * Observer constructor
     * @param  {Object} props       Initialized ptops
     * @return {React.component}    The component instance
     */
    constructor(props) {
        super(props);

        // Track isMounted locally
        this._isMounted = false;

        // Normalize namespaces to array
        this.namespaces = typeof props.namespaces === 'string' ? 
            [props.namespaces]
            : props.namespaces;

        // Queue for batch updates
        this._queue = {};
        this.namespaces.forEach(ns => this._queue[ns] = []);

        // Initialize state
        this.state = this.getInitialState(props.store);

        // Subscribe to store namespaces
        this.unsubscribers = [];
        this.subscribeArray(props.subscribe);
    }

    /**
     * Initialize state
     * 
     * Map store namespaces to local state
     * 
     * @param {Store} store The store holding namespace data
     */
    getInitialState(store) {
        const state = {};
        this.namespaces.map(ns => {
            state[ns] = store.get(ns);
        });
        return assign({}, state);
    }

    /**
     * Subscribe to multiple namespaces
     * 
     * @param {Function} subscribe The subscribe function
     */
    subscribeArray(subscribe) {
        this.namespaces.forEach(ns => {
            this.unsubscribers.push(subscribe(ns, data => {
                this.update(ns, data);
            }));
        });
    }

    /**
     * Update component state
     * 
     * @param {String}  namespace   The namespace to be updated
     * @param {Object}  data        The data to be updated
     */
    update(namespace, data) {
        const nextState = assign(this.state, data);
        if (this._isMounted) this.setState(nextState);
        else this._queue[namespace].push(nextState);
    }

    /**
     * Flush pending updates in queue
     */
    flushUpdates() {
        for (let ns in this._queue) {
            if (this._queue[ns].length) {
                let nextState = {};
                this._queue[ns].map(state => nextState = assign(nextState, state));
                this._queue[ns].splice(0, this._queue[ns].length);
                this.update(ns, nextState);
            }
        }
    }

    /**
     * On component did mount, set _isMounted
     * Is necessary to track wether the component is mounted or not
     * 
     * @return {Boolean} The react result
     */
    componentDidMount() {
        this._isMounted = true;
        this.flushUpdates();
    }

    /**
     * Unsubscribe when component unmount
     */
    componentWillUnmount() {
        this._isMounted = false;
        this.unsubscribers.forEach(fn => fn());
    }

    /**
     * Renders the wrapped component
     * 
     * @return {String} The JSX string to be rendered by ReactDOM
     */
    render() {
        const { render, input  } = this.props;
        let output = assign({}, input);
        this.namespaces.forEach(ns => output[ns] = this.state[ns]);
        return render(output);
    }
};

export default ObserverComponent;
