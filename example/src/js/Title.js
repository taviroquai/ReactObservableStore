import React from 'react';
import Store, { withStore } from '../../../src/ReactObservableStore';
import { updateSync, updateAsync } from './actions';
import SubComponent from './SubComponent';
import Loading from './Loading';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';

class Title extends React.Component {
	componentWillMount() {
		updateAsync('Update async on will mount')
	}
	render () {
		return this.props.loading ? <Loading /> : (
			<div>
				<div><em>title</em> from Store: {this.props.title.nested}</div>
				<p><em>param</em> from router: {this.props.match.params.param}</p>
				<p><em>foo</em> from props: {this.props.foo}</p>
				<Link to="/">back</Link>
			</div>
		)
	}
}
export default withRouter(withStore('namespace', Title));
