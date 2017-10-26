import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from './containers/Tree';
import { withStore } from './Store';

class App extends Component {
  updateTitle(input) {
    this.props.store({ title: input });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{ this.props.title }</h1>
        </header>
        <p className="App-intro">
          Edit title in store (sync example){' '}
          <input value={this.props.title} onChange={(e) => this.updateTitle(e.target.value)} />
        </p>
        <Tree />
      </div>
    );
  }
}

export default withStore(App);
