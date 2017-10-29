var React = require('react');
var StatelessComponent = require('./StatelessComponent').default;
var Store = require('react-observable-store').default;
var actions = require('./actions');

var ContainerB = React.createClass({
	getInitialState: function() {
        return Store.get('namespace');
    },
	componentDidMount() {
		this.observerId = Store.subscribe('namespace', (data) => {
			this.setState(data);
		});
	},
	componentWillUnmount() {
		Store.unsubscribe('namespace', this.observerId);
	},
	update() {
		actions.updateAsync();
	},
	render() {
		return (
			<div>
				<h3>ContainerB Example (Manual subscription)</h3>
				<ul>
					<li>Loads props from Store using <em>Store.get('namespace') during initialization</em></li>
					<li>Subscribes to Store in componentDidMount using <em>Store.subscribe</em></li>
					<li>Updates local state using on fn call</li>
					<li>Unsubscribes on componentWillUnmount using <em>Store.unsubscribe</em></li>
					<li>Updates store in <em>actions.js</em> (async)</li>
				</ul>
				<pre>
					this.state.title.nested: {this.state.title.nested}
				</pre>
				<button onClick={(e) => this.update()}>Update Async</button>
			</div>
		);
	}
});

exports['default'] = ContainerB;
