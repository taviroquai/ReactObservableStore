import React from 'react';
import assign from 'lodash-es/assign';
import { updateSync, updateAsync } from './actions';
import Store from '../lib';
import { Link } from 'react-router-dom';

class SubComponent extends React.Component {

	constructor(props) {
		super(props);

		// Test with local state
		this.state = {
			title: 'local state',
			gDSfP: 'not yet',
			sCU: 'not yet',
			CdM: 'not yet',
			CdU: 'not yet',
			alldone: 'not yet'
		};
	}

	static getDerivedStateFromProps(props, state) {
		let nextState = assign({}, state);
		nextState.gDSfP = 'done';
		return nextState;
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.alldone === 'not yet';
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState((state, props) => {
				let nextState = assign({}, state);
				nextState.CdM = 'done';
				return nextState;
			});
		}, 1500);
	}

	componentDidUpdate() {
		setTimeout(() => {
			this.setState((state, props) => {
				let nextState = assign({}, state);
				nextState.CdU = 'done';
				nextState.title = state.CdU === 'done' ? props.app.title : state.title;
				nextState.alldone = state.title === props.app.title ? 'yes!' : state.alldone;
				return nextState;
			});
		}, 1500);
	}

	updateSync(value) {
		this.setState((state, props) => {
			return {
				title: 'reset',
				gDSfP: 'not yet',
				sCU: 'not yet',
				CdM: state.CdM,
				CdU: 'not yet',
				alldone: 'not yet'
			};
		}, () => {
			updateSync(value);
		});
	}
	
 	render () {
		const { app, session } = this.props;
		return (
			<div>
				<p>
					Read store props with <em>this.props.app.title</em>: {app.title}
				</p>
				<p>
					Read other store props with <em>this.props.session.username</em>: {session.username}
				</p>
				<p>
					Read from anywhere with <em>Store.get('namespace.title')</em>: {Store.get('app.title')}
				</p>
				<p>
					React Router Link example: <Link to="/record/id">click</Link>
				</p>
        <p>
					Button <button onClick={(e) => this.updateSync('sync') }>Update without unmount</button> example
				</p>
				<p>
					Async <button onClick={(e) => updateAsync('async') }>Update with unmout</button> example
				</p>
				<p>
					getDerivedStateFromProps: {this.state.gDSfP}<br />
					componentDidMount: {this.state.CdM}<br />
					componentDidUpdate: {this.state.CdU}<br />
					Local state <em>this.state.title</em>: {this.state.title}
				</p>
			</div>
		);
	}
}

export default SubComponent;
