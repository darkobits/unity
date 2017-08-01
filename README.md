# unity

Unity is a library that helps you write shorter, cleaner unit tests for your Angular 1.x applications by eliminating much of the boilerplate requried to set up a test suite and by providing utility functions for common tasks.

### Before:

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
- Three locations need to be updated to get access to an injectable.

### After:

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
- Zero boilerplate to access an injectable, just use `get()` wherever you need it!

## Requirements

- Angular >=1.3.
- If you run your tests in a browser-like environment (ex: PhantomJS):
  - You may need an ES6 polyfill, like [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/).
  - You will need to run a module-bundler on your test files.
- If you run your tests in Jest, Unity should Just Work!

## Install

```bash
npm install --save-dev @collectivehealth/unity
```

## Documentation

### [API](#api-1)
- [`controller`](#controllername-string-opts-object-object)
- [`directive`](#directivename-string-opts-object-object)
- [`componentController`](#componentcontrollername-string-opts-object-object)
- [`service`](#servicename-string-opts-object-object)
- [`provider`](#providername-string-opts-object-object)
- [`filter`](#filtername-string-opts-object-object)

### [Utilities](#utilities-1)
- [`get`](#getname-string-object)
- [`matchUrl`](#matchurlsegments-array-params-object-object)
- [`module`](#modulemodules-arglist-opts-object-void)
- [`digest`](#digest-void)
- [`flush`](#flushservices-string-void)

## API

These functions are designed to help prepare various Angular constructs for unit testing.

### `controller(name: string[, opts: object]): object`

Prepares a controller for testing.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Name of the controller. Supports `controllerAs` syntax.|
|`[opts]`|`Object`|Options object.|
|`[opts.locals]`|`Array`|Injection locals for the controller, will override the default injectable that the controller asks for.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience. *Discouraged, use [`get()`](/collectivehealth/unity#getname-string-object) instead.*|

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
    // Controller instance is bound to its $scope using the provided controllerAs alias.
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
|`[opts.wrap]`|`String` || `Object`|Template string or pre-compiled element to wrap around the directive's template. Useful for directives that `require` a parent directive in order to function, or are otherwise sensitive to context. If you need to insert the directive at a specific place in the wrapper template, you may create a `<transclude></transclude>` element and Unity will call [replaceWith()](https://api.jquery.com/replaceWith/) on it. Otherwise, the directive will be [append()](https://api.jquery.com/append/)-ed to the wrapper's outermost element.|
|`[opts.scope]`|`Object`|Properties to add to the directive's parent scope.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience. *Discouraged, use [`get()`](/collectivehealth/unity#getname-string-object) instead.*|

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
|`[opts.init=true]`|`Boolean`|Whether to automatically call the component's `$onInit` method. Defaults to `true`.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience. *Discouraged, use [`get()`](/collectivehealth/unity#getname-string-object) instead.*|

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
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience. *Discouraged, use [`get()`](/collectivehealth/unity#getname-string-object) instead.*|

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
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience. *Discouraged, use [`get()`](/collectivehealth/unity#getname-string-object) instead.*|

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
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience. *Discouraged, use [`get()`](/collectivehealth/unity#getname-string-object) instead.*|

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

### `module(modules: arglist[, opts: object]): void`

Instantiates one or more modules. By default, ui-router's `$urlRouter` is disabled to prevent the router from iterfering with tests. This can be overridden if needed. Additional mocked injectables can be specified. **Note:** After `module` has been called, the Angular injector will be initialized and additional modules cannot be loaded.

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
} from '@collectivehealth/unity';

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
} from '@collectivehealth/unity';

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
|`'a'`, `'animate'`|`$animate`|

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

### `compile(options: object): object`

**Note:** This method is designed to help test complex directives that are sensitive to their surrounding DOM elements (particularly, directives that `require` parent/sibling controllers) and should not be needed in most cases.

Compiles the provided template string. Can optionally use a provided scope and can insert the element into an existing DOM tree prior to compilation.

|Name|Type|Description|
|---|---|---|
|`options`|`object`|Options object.|
|`options.template`|`string`|Template to compile.|
|`[options.scope]`|`object`|(Optional) Scope to use when compiling the template.|
|`[options.insertAt]`|`object`|(Optional) jqLite element to `append` the element to just prior to compilation.|

**Returns:**

`object` - Compiled element.

**Example:**

Here, we are testing `FooDirective`, which is `required` by `BarDirective`. We want to test how `FooDirective` behaves when we insert a `BarDirective` (or multiple `BarDirectives`) into the DOM as children of `FooDirective`. We can use the standard approach of assigning `FooDirective` to our shared variable, `T`. We can then use `compile` to create an instance of `BarDirective` and insert it into `FooDirective`'s template.

```js
import {
  compile,
  directive,
  module
} from '@collectivehealth/unity';

describe('Foo Directive', () => {
  let T;

  beforeEach(() => {
    module('FooModule');

    T = directive('FooDirective', {
      template: `
        <foo some-attr="quz">
          <baz></baz>
          <transclude></transclude>
        </foo>
      `
    });
  });

  describe('when bar-attr is "true"', () => {
    let Bar;

    beforeEach(() => {
      compile({
        template: `
          <bar bar-attr="true"></bar>
        `,
        insertAt: T.$element.find('transclude')
      });
    });

    it('should be bar-tastic', () => {
        // Here, we now have a reference to Foo (and its element, scope, etc) via T, and to Bar's controller via Bar.
    });
  });

  describe('when bar-attr is "false"', () => {
    let Bar;

    beforeEach(() => {
      compile({
        template: `
          <bar bar-attr="false"></bar>
        `,
        insertAt: T.$element.find('transclude')
      });
    });

    it('should be bar-tastic', () => {
        // Here, we now have a reference to Foo (and its element, scope, etc) via T, and to Bar's controller via Bar.
    });
  });
});
```
