# React Observable Store

## Why?
Because in some apps Redux is overkilling.  
This module uses the Observer Pattern: components subscribe to store updates.  
Very simple API.  

## Demo & Examples

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-observable-store is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-observable-store.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-observable-store --save
```

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

NOTE: known dev dependencies [bug](https://github.com/JedWatson/generator-react-component/issues/15)  

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

MIT

Copyright (c) 2017 Marco Afonso.
