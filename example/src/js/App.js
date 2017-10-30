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
	                    Read store props with this.props.title.nested: {this.props.title.nested}
	                </pre>
				) }
				<pre>
					Read from anywhere with Store.get('namespace.title.nested'): {Store.get('namespace.title.nested')}
				</pre>
                <p>Sync update store <button onClick={(e) => updateSync('sync') }>Update</button></p>
				<p>Async update store <button onClick={(e) => updateAsync('async') }>Update</button></p>
			</div>
		);
	}
}

export default withStore('namespace', App);
