
# React ObservableStore (experimental)

## Why?
Because in some apps Redux is overkilling.

## Usage
Very fast and simple API

### Initialize in top level component (or index.js)

```
import Store from './Store';
Store({ foo: 'bar' }, true);
```

### Use the store in the desired sub level component (container recommended)
```
import { withStore } from './Store';
class MyComponent extends React.Component {};
export default withStore(MyComponent);
```

### Read store on component
```
<p>foo: { this.props.foo }</p>
```

### Update store from component, where setState is allowed
```
this.props.store({ foo: 'baz' });
```
