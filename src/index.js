import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './Store';
import registerServiceWorker from './registerServiceWorker';

Store({ title: 'Welcome to React' }, true);

const root = document.getElementById('root');
ReactDOM.render(
    <App />
    , root);
registerServiceWorker();
