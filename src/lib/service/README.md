### `service(name: string[, opts: object]): object`

Configures a service for testing. Because services are singletons and are instantiated as soon as the application runs, you cannot mock a service's injectables with `service`. Instead, mock them at the application level with `module`.

**Parameters:**

|Name|Type|Description|
|---|---|---|
|`name`|`String`|Name of the service.|
|`[opts]`|`Object`|Options object.|
|`[opts.inject]`|`Object`|Additional injectables to attach to the spec object for convenience. *Discouraged, use [`get()`](/src/utils/get) instead.*|

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
} from '@darkobits/unity';

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
