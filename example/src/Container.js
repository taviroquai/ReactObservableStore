var React = require('react');
var StatelessComponent = require('./StatelessComponent').default;
var Store = require('react-observable-store');
var actions = require('./actions');

var Container = React.createClass({
	update(input) {
		actions.updateTitle(input);
	},
	render () {
		return (<StatelessComponent {...this.props} update={this.update} />);
	}
});

exports['default'] = Store.withStore(Container);
