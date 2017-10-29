var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./App').default;
var Store = require('react-observable-store').default;

Store.init({
    namespace: {
        loading: false,
        title: {
            nested: 'Welcome to Observable Store'
        }
    }
}, true);

ReactDOM.render(<App />, document.getElementById('app'));
