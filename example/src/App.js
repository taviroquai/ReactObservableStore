var React = require('react');
var Container = require('./Container').default;
var Store = require('react-observable-store').default;
var PropTypes = require('prop-types');
console.log(Store);
var App = React.createClass({
	propTypes: {
		title: PropTypes.object.isRequired
	},
	render () {
		return (
			<div>
				<pre>
					this.props.title.nested: {this.props.title.nested}
				</pre>
				<Container />
				<pre>
					Store.get('namespace.title.nested'): {Store.get('namespace.title.nested')}
				</pre>
			</div>
		);
	}
});

exports['default'] = Store.withStore('namespace', App);
