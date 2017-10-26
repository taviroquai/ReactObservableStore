import React from 'react';
import Node from '../containers/Node';
import Loading from './Loading';

const Tree = ({ title, loading }) =>
    loading ? <Loading />
    : (
        <div className="tree">
            <p>title in Tree: {title}{' '}</p>
            <Node id={1} />
            <Node id={2} title="local only" />
        </div>
    );

export default Tree;
