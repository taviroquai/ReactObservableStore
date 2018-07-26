import React from 'react';
import Store, { withStore, subscribe, unsubscribe } from '../lib';
import { loadRecord, changeRecord, autosaveRecord } from './actions';
import Loading from './Loading';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';

class AsyncRecord extends React.Component {

	constructor(props) {
		super(props);

		// Manually subscribe to Store. See unsubscribe bellow!
		this.state = {};
		this.observer_id = Store.subscribe('record', (state) => {
			this.setState(state);
		}, this);
		
	}

	componentDidMount() {
		const { param } = this.props.match.params;

		// Load async record
		loadRecord(param);
	}

	componentDidUpdate() {

		// Autosave record (async)
		autosaveRecord(this.state);
	}

	componentWillUnmount() {

		// Manually unsubscribe on will mount - MANDATORY!
		Store.unsubscribe('record', this.observer_id);
	}

	render () {
		const { loading } = this.state;
		return loading !== false ? <Loading /> : (
			<div>
				<p>Local state: {JSON.stringify(this.state)}</p>
				<button onClick={e => changeRecord()}>edit</button>
				<p><em>param</em> from router: {this.props.match.params.param}</p>
				<p><em>foo</em> from props: {this.props.foo}</p>
				<Link to="/">back</Link>
			</div>
		)
	}
}

export default withRouter(AsyncRecord);
