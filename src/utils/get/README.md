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
} from '@darkobits/unity';

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
