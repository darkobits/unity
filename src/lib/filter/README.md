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
