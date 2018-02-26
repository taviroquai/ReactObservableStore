# React Observable Store

[![Code Climate](https://codeclimate.com/github/taviroquai/ReactObservableStore/badges/gpa.svg)](https://codeclimate.com/github/taviroquai/ReactObservableStore)
[![Build Status](https://travis-ci.org/taviroquai/ReactObservableStore.svg?branch=master)](https://travis-ci.org/taviroquai/ReactObservableStore)

## Why?
React Observable Store is a very simple state management store (HoC) for ReactJS applications.  
This module uses the Observer Pattern: components subscribe to store updates.  

## Demo & Examples

To build the examples locally, run:

```
npm install
npm run dev
```

Then open [`localhost:8081`](http://localhost:8081) in a browser.


## Installation

```
npm install react-observable-store --save
```

You can also use the standalone build by including `dist/react-observable-store.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

## Usage

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

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Gulp+Babel) is available in `lib` for use with node.js, browserify and webpack. The example bundle is also built to `dist`.

To build, watch and serve the examples (which will also watch the component source), run `npm run build`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch`.

## License

MIT

Copyright (c) 2017 Marco Afonso.
