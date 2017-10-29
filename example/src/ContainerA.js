var React = require('react');
var StatelessComponent = require('./StatelessComponent').default;
var Store = require('react-observable-store');
var actions = require('./actions');

var ContainerA = React.createClass({
	update(input) {
		actions.updateSync(input);
	},
	render () {
		return (<StatelessComponent {...this.props} update={this.update} />);
	}
});

exports['default'] = Store.withStore('namespace', ContainerA);
