import React, { Component } from 'react';
import NodeComponent from '../components/Node';
import { withStore } from '../Store';

class Node extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }
    update(title) {
        this.props.store({ loading: true });
        setTimeout(() => {
            this.props.store({ title, loading: false });
        }, 2000);
    }
    render() {
        return (
            <NodeComponent {...this.props} update={this.update} />
        );
    }
}

export default withStore(Node);
