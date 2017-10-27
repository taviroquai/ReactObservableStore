var React = require('react');
var PropTypes = require('prop-types');

var StatelessComponent = React.createClass({
	propTypes: {
		title: PropTypes.string.isRequired,
		update: PropTypes.func.isRequired
	},
	render () {
		return (
			<div>
				Edit title in store (sync example)
				{' '}
				<input value={this.props.title}
					onChange={(e) => this.props.update(e.target.value)}
				/>
			</div>
		);
	}
});

exports['default'] = StatelessComponent;
