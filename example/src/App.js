var React = require('react');
var ContainerA = require('./ContainerA').default;
var ContainerB = require('./ContainerB').default;
var LoadingComponent = require('./LoadingComponent').default;
var Store = require('react-observable-store').default;
var PropTypes = require('prop-types');

var App = React.createClass({
	propTypes: {
		loading: PropTypes.bool.isRequired,
		title: PropTypes.object.isRequired
	},
	render () {
		return (
			<div>
				{ this.props.loading ? (<LoadingComponent />) : (
					<div>
						<hr />
						<ContainerA />
						<hr />
						<ContainerB />
					</div>
				) }
				<hr />
				<pre>
					Access from anywhere using Store.get('namespace.title.nested'): {Store.get('namespace.title.nested')}
				</pre>
			</div>
		);
	}
});

exports['default'] = Store.withStore('namespace', App);
