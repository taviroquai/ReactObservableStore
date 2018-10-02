import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import Store from '../lib';

// Init store
Store.init({
    app: {
        loading: false,
        title: 'Loading...'
    },
    session: {
        username: 'admin!'
    },
    record: {
        param: null,
        data: null,
        saved: false
    }
}, true);

ReactDOM.render(<Root />, document.getElementById('index'));
