import React from 'react';
import Store, { withStore } from '../../../src/ReactObservableStore';
import { updateSync, updateAsync } from './actions';
import Loading from './Loading';

class App extends React.Component {
	render () {
		return (
			<div>
				{ this.props.loading ? (<Loading />) : (
					<pre>
	                    Read store props with <em>this.props.title.nested</em>: {this.props.title.nested}
	                </pre>
				) }
				<pre>
					Read from anywhere with <em>Store.get('namespace.title.nested')</em>: {Store.get('namespace.title.nested')}
				</pre>
                <p>Sync update store <button onClick={(e) => updateSync('sync') }>Update</button></p>
				<p>Async update store <button onClick={(e) => updateAsync('async') }>Update</button></p>
			</div>
		);
	}
}

export default withStore('namespace', App);
