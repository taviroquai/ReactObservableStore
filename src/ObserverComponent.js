var React = require('react');
var assign = require('lodash.assign');

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
        this.state = assign({}, props.storage[this.props.namespace]);

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
    }

    /**
     * On component did mount, set _isMounted
     * @return {Boolean} The react result
     */
    componentDidMount() {
        this._isMounted = true;
    }

    /**
     * Unsubscribe observers of components that will unmount
     */
    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * Renders the wrapped component
     * @return {String} The JSX string to be rendered by ReactDOM
     */
    render() {
        var { storage, namespace } = this.props;
        var output = assign({}, this.props.input)
        output = assign(output, storage[namespace])
        return this.props.render(output);
    }
};

export default ObserverComponent;
