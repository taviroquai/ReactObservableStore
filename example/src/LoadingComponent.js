var React = require('react');
var PropTypes = require('prop-types');

var LoadingComponent = React.createClass({
	render () {
		return (
			<div>
				LoadingComponent: loading...
			</div>
		);
	}
});

exports['default'] = LoadingComponent;
