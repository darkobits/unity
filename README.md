# unity

Unity is a library that helps you write shorter, cleaner unit tests for your Angular 1.x applications by eliminating much of the boilerplate requried to set up a test suite and by providing utility functions for common tasks.

## Requirements

- Angular >=1.3.
- If you run your tests in a browser-like environment (ex: PhantomJS):
  - You may need an ES6 polyfill, like [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/).
  - You will need to run a module-bundler on your test files.
- If you run your tests in Jest, Unity should Just Work!

## Install

```bash
yarn add --dev @collectivehealth/unity
```
or

```bash
npm install --save-dev @collectivehealth/unity
```

## Documentation

### API
- [`controller`](/src/lib/controller)
- [`directive`](/src/lib/directive)
- [`componentController`](/src/lib/componentController)
- [`service`](/src/lib/service)
- [`provider`](/src/lib/provider)
- [`filter`](/src/lib/filter)

### Utilities
- [`get`](/src/utils/compile)
- [`matchUrl`](/src/utils/matchUrl)
- [`module`](/src/utils/module)
- [`digest`](/src/utils/digest)
- [`flush`](/src/utils/flush)

## Example

### Before

```js
let $controller;
let $document;
let $location;
let $q;
let $scope;

describe('MyController', () => {
  beforeEach(module('MyApp'));

  beforeEach(inject((_$controller_, _$document_, _$location_, _$q_) => {
    $controller = _$controller_;
    $document = _$document_;
    $location = _$location_;
    $q = _$q_;
    $scope = {};
  }));

  it('should work', () => {
    let myCtrl = $controller('MyCtrl', {
      $scope: $scope
    });

    // ...
  });
});
```

- Multiple shared variables that are re-used across specs.
- Syntax is verbose.
- Three locations need to be updated to get access to an injectable. 😿

### After

```js
import {
  controller,
  get,
  module
} from '@collectivehealth/unity';

describe('MyCtrl', () => {
  let T;

  beforeEach(() => {
    module('MyApp');
    T = controller('MyCtrl');
  });

  it('should work', () => {
    // T.$scope is the controller's scope.
    // T.MyCtrl is the controller instance.
    // Use get('$document') and get('$location') to interact with other injectables.
  });
});
```

- One shared variable across specs, regardless of how many injectables are being used.
- Syntax is terse and readable.
- Zero boilerplate to access an injectable, just use `get()` wherever you need it! 😺
