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
				<h3>ContainerA Example (Automatic subscription)</h3>
				<ul>
					<li>Loads props from Store using <em>withStore</em></li>
					<li>Updates store in <em>actions.js</em> (sync)</li>
				</ul>
				<input value={this.props.title.nested}
					onChange={(e) => this.props.update(e.target.value)}
					style={{width: '250px'}}
				/>
			</div>
		);
	}
});

exports['default'] = StatelessComponent;
