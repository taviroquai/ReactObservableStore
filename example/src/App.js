var React = require('react');
var Container = require('./Container').default;
var Store = require('react-observable-store');
var PropTypes = require('prop-types');

var App = React.createClass({
	propTypes: {
		title: PropTypes.string.isRequired
	},
	render () {
		return (
			<div>
				<h3>{this.props.title}</h3>
				<Container />
			</div>
		);
	}
});

exports['default'] = Store.withStore(App);
