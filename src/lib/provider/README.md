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
