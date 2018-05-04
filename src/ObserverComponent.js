const React = require('react');
const assign = require('lodash.assign');

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

        // Set initial state
        this.state = assign({}, props.store.get(props.namespace));

        // Set updates queue
        this._queue = [];

        // Subscribe to store
        const me = this;
        me.id = props.subscribe(props.namespace, function upd(data) {
            me.update(data);
        });
    }

    /**
     * Update component state
     * @param {Object}  data  The data to be updated
     * @param {Boolean} merge Flag to merge with current state
     */
    update(data) {
        const newState = assign(this.state, data);
        if (this._isMounted) this.setState(newState);
        else this._queue.push(newState);
    }

    /**
     * On component did mount, set _isMounted
     * @return {Boolean} The react result
     */
    componentDidMount() {
        const me = this;
        me._isMounted = true;
        var lastState = {}
        me._queue.map(item => {
            lastState = assign(lastState, item);
        });
        me.setState(lastState);
        me._queue.splice(0, me._queue.length);
    }

    /**
     * Unsubscribe observers of components that will unmount
     */
    componentWillUnmount() {
        this._isMounted = false;
        this.props.unsubscribe(this.props.namespace, this.id);
    }

    /**
     * Renders the wrapped component
     * @return {String} The JSX string to be rendered by ReactDOM
     */
    render() {
        var { store, namespace } = this.props;
        var output = assign({}, this.props.input)
        output = assign(output, store.get(namespace))
        return this.props.render(output);
    }
};

export default ObserverComponent;
