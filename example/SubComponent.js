import React from 'react';
import { updateSync, updateAsync } from './actions';
import Store from '../lib';
import { Link } from 'react-router-dom';

class SubComponent extends React.Component {
 	render () {
		const { title } = this.props;
		return (
			<div>
				<p>
					Read store props with <em>this.props.title</em>: {title}
				</p>
				<p>
					Read from anywhere with <em>Store.get('namespace.title')</em>: {Store.get('namespace.title')}
				</p>
				<p>
					React Router Link example: <Link to="/record/id">click</Link>
				</p>
        <p>
					Button <button onClick={(e) => updateSync('sync') }>Update</button> example
				</p>
				<p>
					Async <button onClick={(e) => updateAsync('async') }>Update</button> example
				</p>
			</div>
		);
	}
}

export default SubComponent;
