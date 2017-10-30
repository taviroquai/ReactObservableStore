import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from '../../../src/ReactObservableStore';

Store.init({
    namespace: {
        loading: false,
        title: {
            nested: 'Welcome to Observable Store'
        }
    }
}, true);

ReactDOM.render(<App />, document.getElementById('app'));
