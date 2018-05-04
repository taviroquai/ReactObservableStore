import React from 'react';
import Store, { withStore } from '../../../src/ReactObservableStore';
import { updateSync, updateAsync } from './actions';
import SubComponent from './SubComponent';
import Loading from './Loading';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { loading: true }
	}

	componentDidMount() {
		updateSync('Prop did mount')
	}

	static getDerivedStateFromProps(props, oldState) {
		if (props.loading === oldState.loading) return null;
		return {
			...props
		}
	}

	render () {
		console.log('render app loading', this.props.loading)
		return this.state.loading ? <Loading /> : <SubComponent {...this.props} />
	}
}
export default withRouter(withStore('namespace', App));
