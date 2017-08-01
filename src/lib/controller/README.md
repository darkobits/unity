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
