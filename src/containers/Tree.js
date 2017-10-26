import React, { Component } from 'react';
import TreeComponent from '../components/Tree';
import { withStore } from '../Store';

class Tree extends Component {
    render() {
        return (
            <TreeComponent {...this.props} />
        );
    }
}

export default withStore(Tree);
