import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import AsyncRecord from './AsyncRecord';

class Root extends React.Component {
	render () {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={App} />
					<Route path="/record/:param" render={(props) => <AsyncRecord foo="bar" {...props} />} />
				</Switch>
			</Router>
		)
	}
}

export default Root;
