### `module(modules: arglist[, opts: object]): void`

Instantiates one or more modules. Usually this will be called in a `beforeEach` or `beforeAll` block as part of test setup.

**Note to `ui-router` users:** By default, `ui-router`'s `$urlRouter` is disabled to prevent the router from iterfering with tests. This behavior can be overridden if needed.

**Note:** After `module` has been called, the Angular injector will be initialized and additional modules cannot be loaded.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`modules`|`Arglist`|List of module names (supplied as individual arguments) to load.|
|`[opts]`|`Object`|Optionally provide additional configuration and mocks.|
|`[opts.disableUrlRouter=true]`|`Boolean`|Whether to disable ui-router's `$urlRouter`.|
|`[opts.mock]`|`Object`|Object with values that will be used to create mocked injectables for the entire application.|

**Examples:**

Loading a single module:

```js
import {
  module
} from '@darkobits/unity';

describe('MyAwesomeSpec', () => {
  beforeEach(() => {
    module('MyAwesomeApp');
  });
});
```

Loading multiple modules:

```js
import {
  module
} from '@darkobits/unity';

describe('MyAwesomeSpec', () => {
  beforeEach(() => {
    module('MyAwesomeApp', 'MyOtherApp');
  });
});
```

Globally mocking injectables:

```js
import {
  module,
  get
} from '@darkobits/unity';

describe('MyAwesomeSpec', () => {
  let T;

  beforeEach(() => {
    const mocks = {
      SomeAwesomeService: {
        callApi () {
          return get('$q').resolve({foo: 'bar'})
        },
        logOut () {
          return true;
        }
      }
    };

    module('MyAwesomeApp', {
      mock: mocks
    });
  });

  // ...
});
```
