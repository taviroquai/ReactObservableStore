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

        // Create component instance identifier
        this.id = props.name + '_' + Math.random().toString(36).substring(2);

        // Creates the merged data
        this.output = assign({}, props.storage[this.props.namespace]);
        this.output = assign(this.output, props.sanitizeData(props.input));
    }

    /**
     * On component mount, subscribe to store updates
     * @return {Boolean} The react result
     */
    componentDidMount() {
        var me = this;
        this.props.subscribe(
            this.props.namespace,
            this.id,
            function updater(data) { me.update(data); }
        );
    }

    /**
     * Update component state with new props
     * @param  {Object} nextProps The next props that will be received
     */
    componentWillReceiveProps(nextProps) {
        this.update(nextProps.input);
    }

    /**
     * Unsubscribe observers of components that will unmount
     */
    componentWillUnmount() {
        this.props.unsubscribe(this.props.namespace, this.id);
    }

    /**
     * Update component state
     * @param  {Object} data The data to be updated
     */
    update(data, merge = true) {
        this.output = merge ? assign(this.output, this.props.sanitizeData(data))
            : this.props.sanitizeData(data);

        // Delegate updates to wrapped component
        this.forceUpdate();
    }

    /**
     * Renders the wrapper
     * Allows the component to access the store update method
     * and to unsubscribe to store store updates
     * @return {String} The JSX string to be rendered by ReactDOM
     */
    render() {
        return React.createElement(this.props.component, this.output);
    }
};

export default ObserverComponent;
