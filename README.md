# react-observable-store

## Why?
Because in some apps Redux is overkilling.  
This module uses the Observer Pattern: components subscribe to store updates.  
Very simple API.  

## Demo & Examples

Live demo: [taviroquai.github.io/react-observable-store](http://taviroquai.github.io/react-observable-store/)

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

NOTE: known dependencies [bug](https://github.com/JedWatson/generator-react-component/issues/15)


## Usage

### Initialize (ES6) in top level component (or index.js)

```
import Store from 'react-observable-store';
Store.init({ foo: 'bar' }, true);
```

### Use the store (ES6) in sub level component (container recommended)
```
import { withStore } from 'react-observable-store';
class MyComponent extends React.Component {};
export default withStore(MyComponent);
```

### Access store data on component
```
<p>foo: { this.props.foo }</p>
```

### Update store from actions.js (recomended redux way)
```
Store.update({ foo: 'baz' });
```

### Update store from component where setState is allowed (not recomended)
```
this.props.store({ foo: 'baz' });
```

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

MIT

Copyright (c) 2017 Marco Afonso.
