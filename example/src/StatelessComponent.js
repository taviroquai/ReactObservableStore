var React = require('react');
var PropTypes = require('prop-types');

var StatelessComponent = React.createClass({
	propTypes: {
		title: PropTypes.object.isRequired,
		update: PropTypes.func.isRequired
	},
	render () {
		return (
			<div>
				Change nested:{' '}
				<input value={this.props.title.nested}
					onChange={(e) => this.props.update(e.target.value)}
					style={{width: '250px'}}
				/>
			</div>
		);
	}
});

exports['default'] = StatelessComponent;
