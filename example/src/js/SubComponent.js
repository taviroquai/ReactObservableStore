import React from 'react';

const SubComponent = ({ title }) => (
	<p>
		Read store props with <em>this.props.title.nested</em>: {title.nested}
	</p>
);

export default SubComponent;
