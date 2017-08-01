### `digest(): void`

Run a digest cycle on the root scope. Shorthand for `get('$rootScope').$digest()`.

**Example:**

```js
import {
  digest
} from '@collectivehealth/unity';

describe('SomeAsyncUnit', () => {
  let T;

  beforeEach(() => {
    // Instantiate something that needs to have a digest cycle run before it can
    // be tested.

    digest();
  });
});
```

**See Also:**
- [flush]()
