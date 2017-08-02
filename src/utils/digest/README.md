### `digest(): void`

Run a digest cycle on the root scope. Shorthand for `get('$rootScope').$digest()`.

**Example:**

```js
import {
  digest,
  directive
} from '@darkobits/unity';

describe('SomeAsyncUnit', () => {
  let T;

  beforeEach(() => {
    T = directive('SomeDirectiveThatNeedsADigestCycleRunBeforeTesting', {
      // ...
    });

    digest();
  });

  it('should be ready to test', () => {
    // Yay!
  });
});
```

**See Also:**
- [flush](/src/utils/flush)
