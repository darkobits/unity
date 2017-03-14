# unity

## Requirements

- Angular >=1.3.
- If you run your tests in a browser-like environment:
  - You may need an ES6 polyfill, like [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/).
  - You will need to run a module-bundler on your test files.

## Install

```bash
npm install --save-dev @collectivehealth/unity
```

## API

These functions are designed to help prepare various Angular constructs for unit testing.

### `controller(name: string[, opts: object]): object`

Prepares a controller for testing.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Name of the controller.|
|`[opts]`|`Object`|Options object.|
|`[opts.locals]`|`Array`|Injection locals for the controller, will override the default injectable that the controller asks for.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience.|

**Returns:**

`Object` - Spec object with the following properties:

|Name|Type|Description|
|---|---|---|
|`<Controller Name>`|`Object`|Reference to the controller instance.|
|`$scope`|`Object`|Reference to the controller's scope.|

**Example:**

```js
import {
  module,
  controller,
} from '@collectivehealth/unity';

describe('MyAwesomeCtrl', () => {
  let T;

  beforeEach(() => {
    module('MyApp');
    T = controller('MyAwesomeCtrl as Awesome');
  });

  it('should be awesome', () => {
    expect(T.MyAwesomeCtrl.isAwesome()).toBe(true);
    expect(T.$scope.Awesome).toEqual(T.MyAwesomeCtrl);
  });
});
```

### `directive(name: string, opts: object): object`

Prepares a directive for testing.

Directives require a template, analogous to a function's call site, that will determine how the directive will be instantiated and its behavior. To thoroughly test a directive it may need to be compiled with several different template configurations.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Name of the directive.|
|`opts`|`Object`|Options object.|
|`opts.template`|`String`|Template to use to test the directive.|
|`[opts.wrap]`|`String`|Template string to .wrap() around the directive's primary template. Useful for directives that `require` a parent directive in order to function, or otherwise depend on context.|
|`[opts.scope]`|`Object`|Properties of the directive's parent scope.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience.|

**Returns:**

`Object` - Spec object with the following properties:

|Name|Type|Description|
|---|---|---|
|`<Directive Name>`|`Object`|Reference to the directive's controller, if it has one.|
|`$scope`|`Object`|Reference to the directive's parent scope. Depending on how the directive's `scope` property is configured, this may be the same scope used by the directive.|
|`$isolateScope`|`Object`|Reference to the directive's isolate scope, if it uses one.|
|`$element`|`Object`|Reference to the directive's jqLite element instance.|

**Example:**

```js
import {
  module,
  directive,
} from '@collectivehealth/unity';

describe('MyAwesomeDirective', () => {
  let T;

  beforeEach(() => {
    module('MyApp');
    T = directive('MyAwesomeDirective', {
      template: `
        <my-awesome-directive
          ng-model="foo">
        </my-awesome-directive>
      `,
      scope: {
        foo: 'bar'
      }
    });
  });

  it('should be awesome', () => {
    // ...
  });
});
```

### `componentController(name: string[, opts: object]): object`

Prepare a component's controller for testing.

See:

- [Unit-testing Component Controllers](https://docs.angularjs.org/guide/component#unit-testing-component-controllers)
- [$componentController](https://docs.angularjs.org/api/ngMock/service/$componentController)

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Name of the component.|
|`[opts]`|`Object`|Options object.|
|`[opts.locals]`|`Object`|Injection locals for the controller, will override the default injectable that the controller asks for. Useful for mocking injectables like `$attrs`. **Note:** `$scope` and `$element` are mocked automatically.|
|`[opts.bindings]`|`Object`|Optional bindings to pass to the controller instance.|
|`[opts.scope]`|`Object`|Properties of the components's parent scope.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience.|
|`[opts.init=true]`|`Boolean`|Whether to automatically call the component's `$onInit` method. Defaults to `true`.|

**Returns:**

`Object` - Spec object with the following properties:

|Name|Type|Description|
|---|---|---|
|`<Component Name>`|`Object`|Reference to the component controller.|
|`$scope`|`Object`|Reference to the component's scope.|
|`$element`|`Object`|Reference to the components jqLite element instance.|

**Example:**

```js
import {
  module,
  componentController,
} from '@collectivehealth/unity';

describe('MyAwesomeComponent', () => {
  let T;

  beforeEach(() => {
    module('MyApp');
    T = componentController('myAwesomeComponent', {
      bindings: {
        foo: 'bar',
        baz: 'qux'
      }
    });
  });

  it('should be awesome', () => {
    expect(T.myAwesomeComponent.isAwesome()).toBe(true);
  });
});
```

### `service(name: string[, opts: object]): object`

Configures a service for testing. Because services are singletons and are instantiated as soon as the application runs, you cannot mock a service's injectables with `service`. Instead, mock them at the application level with `module`.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Name of the service.|
|`[opts]`|`Object`|Options object.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience.|

**Returns:**

`Object` - Spec object with the following properties:

|Name|Type|Description|
|---|---|---|
|`<Service Name>`|`Object`|Reference to the service.|

**Example:**

```js
import {
  module,
  service
} from '@collectivehealth/unity';

describe('MyAwesomeService', () => {
  let T;

  beforeEach(() => {
    module('MyApp');
    T = service('MyAwesomeService');
  });

  it('should be awesome', () => {
    expect(T.MyAwesomeService.isAwesome()).toBe(true);
  });
});
```

### `provider(name: string[, opts: object]): object`

Prepares a provider for testing.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Name of the provider.|
|`[opts]`|`Object`|Options object.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience.|

**Returns:**

`Object` - Spec object with the following properties:

|Name|Type|Description|
|---|---|---|
|`<Provider Name>`|`Object`|Reference to the provider.|

**Example:**

```js
import {
  module,
  provider
} from '@collectivehealth/unity';

describe('MyAwesomeProvider', () => {
  let T;

  beforeEach(() => {
    module('MyApp');
    T = provider('MyAwesomeProvider');
  });

  it('should be awesome', () => {
    expect(T.MyAwesomeProvider.isAwesome()).toBe(true);
  });
});
```

### `filter(name: string[, opts: object]): object`

Prepares a filter for testing.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Name of the filter.|
|`[opts]`|`Object`|Options object.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience.|

**Returns:**

`Object` - Spec object with the following properties:

|Name|Type|Description|
|---|---|---|
|`<Filter Name>`|`Object`|Reference to the filter.|

**Example:**

```js
import {
  module,
  filter
} from '@collectivehealth/unity';

describe('MyAwesomeFilter', () => {
  let T;

  beforeEach(() => {
    module('MyApp');
    T = filter('MyAwesomeFilter');
  });

  it('should be awesome', () => {
    expect(T.MyAwesomeFilter('is awesome')).toBe(true);
  });
});
```

## Utilities

These functions provide shorthands for several common tasks while testing Angular 1 applications.

### `get(name: string): object`

Returns the named injectable. Throws an error if the injectable doesn't exist.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Name of the injectable.|

**Returns:**

`Object` - Injectable instance, if found.

**Example:**

```js
import {
  module,
  get
} from '@collectivehealth/unity';

describe('MyAwesomeSpec', () => {
  let T;

  beforeEach(() => {
    module('MyApp');
    jest.spyOn(get('$rootScope'), '$watch');
  });

  it('should be awesome', () => {
    // ...
  });
});
```

### `matchUrl(segments: array[, params: object]): object`

`$httpBackend` accepts either a string or a regular expression. When passing a string, the developer must provide the entire, exact URL that their code will make the request with. Regular expressions are more flexible because the entire URL need not be known, but constructing them can be tedious. This method allows developers to build regular expressions that express URLs in terms of route segments and query params, which can then be provided to `$httpBackend`.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`segments`|`Array`|List of URL segments you expect to see in the request, in order.|
|`[params]`|`Object`|Query string params expected in the request. May contain arrays and objects.|

**Returns:**

`RegExp` - Regular expression instance.

**Example:**

```js
import {
  module,
  get,
  matchUrl
} from '@collectivehealth/unity';

describe('MyAwesomeSpec', () => {
  let T;

  beforeEach(() => {
    module('MyApp');

    // This will match requests like "/api/v1/foo/bar?baz=qux&bleep=bloop
    const url = matchUrl(['foo', 'bar'], {baz: 'qux'});

    get('$httpBackend').when('GET', url).respond({
      // ...
    })
  });

  it('should be awesome', () => {
    // ...
  });
});
```

### `module(name: string[, opts: object]): void`

Instantiates an Angular module. By default, ui-router's `$urlRouter` is mocked to prevent the router from interfering with tests. This can be disabled if needed.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Module to load.|
|`[opts]`|`Object`|Options object.|
|`[opts.disableUrlRouter=true]`|`Boolean`|Whether to disable ui-router's `$urlRouter`.|
|`[opts.mock]`|`Object`|Object with values that will be used to create mocked injectables for the entire application.|

**Example:**

```js
import {
  module,
  get
} from '@collectivehealth/unity';

describe('MyAwesomeSpec', () => {
  let T;

  beforeEach(() => {
    module('MyAwesomeApp', {
      mock: {
        SomeAwesomeService: {
          callApi () {
            return get('$q').resolve({foo: 'bar'})
          },
          logOut () {
            return true;
          }
        }
      }
    });
  });

  // ...
});
```

### `digest(): void`

Run a digest cycle on the root scope. Shorthand for `get('$rootScope').$digest()`.

### `flush(...services: string[]): void`

Flush common asynchronous Angular services, then run a digest cycle.

|Token|Service|
|---|---|
|`'h'`, `'http'`|`$httpBackend`|
|`'t'`, `'timeout'`|`$timeout`|
|`'i'`, `'interval'`|`$interval`|

**Example:**

```js
import {
  digest
} from '@collectivehealth/unity';

// Flush $httpBackend, then run a digest cycle.
flush('http');

// Flush $timeout and $interval, then run a digest cycle.
flush('t', 'i');
```
