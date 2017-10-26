import React from 'react';

const Node = ({ id, update }) => (
    <div className="node">
        Node{id}:
        <button onClick={(e) => update('title from Node'+id)}>
            change title from Node{id} (async example)
        </button>
    </div>
)

export default Node;
