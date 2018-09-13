# React Observable Store

[![Code Climate](https://codeclimate.com/github/taviroquai/ReactObservableStore/badges/gpa.svg)](https://codeclimate.com/github/taviroquai/ReactObservableStore)
[![Build Status](https://travis-ci.org/taviroquai/ReactObservableStore.svg?branch=master)](https://travis-ci.org/taviroquai/ReactObservableStore)

## Why?
React Observable Store is a very simple state management store (HoC) for ReactJS applications.  
This module uses the Observer Pattern: components subscribe to store updates.  

## Demo & Examples

To build and run the example locally, run:

```
npm install
npm run start
```

It will open [`localhost:9000`](http://localhost:9000) in a browser.

## Installation

```
npm install react-observable-store --save
```

## Usage in Node

**Initialize (ES6) in top level component (or index.js)**  
```
import Store from 'react-observable-store';
Store.init({ namespace: {foo: 'bar' }});
```

### Automatic updates
**Attach the store to the component using withStore**  
```
import { withStore } from 'react-observable-store';
class MyComponent extends React.Component {};
export default withStore('namespace', MyComponent);
```

**Access store data on component**  
```
<p>foo: { this.props.foo }</p>
```

### Manual subscribe/unsubscribe
**Load props on constructor**  
```
this.state = Store.get('namespace');
```
**Subscribe on componentDidMount**  
```
this.observerId = Store.subscribe('namespace', (data) => {
    this.setState(data);
});
```
**Unsubscribe on componentWillUnmount**  
```
Store.unsubscribe('namespace', this.observerId);
```

### Update store from actions.js (redux alike)
```
import Store from 'react-observable-store';
export const updateFoo = (input) => {
    Store.update('namespace', { foo: input });
};
```

## Usage in Browser

Please see [example-browser/index.html](https://github.com/taviroquai/ReactObservableStore/blob/v2-dev/example-browser/index.html) about how to use in browser.

Note: include the following line after including UMD React/ReactDOM and before the UMD build lib/index.js

```
<script>var process = { env: { NODE_ENV: null } }</script>
```

TODO: improve browser usage

## Development and the Build Process

Currently the development setup uses `babel`, `webpack`, `rollup`, `jest` and `enzyme`.

1. Babel for the obvious reasons
2. webpack for the hotreload example
3. rollup for the building process
4. jest + enzyme for the tests

To build, watch and serve the examples (which will also watch the component source), run `npm run start`.

## License

MIT

Copyright (c) 2017 Marco Afonso.
