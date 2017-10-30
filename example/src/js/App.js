import React from 'react';
import Store, { withStore } from '../../../src/ReactObservableStore';
import { updateSync, updateAsync } from './actions';
import SubComponent from './SubComponent';
import Loading from './Loading';

class App extends React.Component {
	render () {
		return (
			<div>
				{ this.props.loading ? <Loading /> : <SubComponent {...this.props} /> }
				<p>
					Read from anywhere with <em>Store.get('namespace.title.nested')</em>: {Store.get('namespace.title.nested')}
				</p>
                <p>
					Sync <button onClick={(e) => updateSync('sync') }>Update</button> example
					{' '}using <em>{`Store.set('namespace.title.nested', 'sync')`}</em>
				</p>
				<p>
					Async <button onClick={(e) => updateAsync('async') }>Update</button> example
					{' '}using <em>{`Store.update('namespace', {loading: false, title: {nested: 'async'}})`}</em>
				</p>
			</div>
		);
	}
}

export default withStore('namespace', App);
