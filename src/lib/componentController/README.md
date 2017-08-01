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
