import React from 'react';
import { withStore } from '../lib';
import SubComponent from './SubComponent';
import Loading from './Loading';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
	render () {
		const { app } = this.props;
		return app.loading !== false ? <Loading /> : <SubComponent {...this.props} />
	}
}

// withStore example for React.Component observer
export default withRouter(withStore(['app', 'session'], App));
