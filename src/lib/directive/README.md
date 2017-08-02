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
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience. *Discouraged, use [`get()`](/src/utils/get) instead.*|

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
} from '@darkobits/unity';

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
