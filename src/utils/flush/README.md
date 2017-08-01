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
  flush
} from '@collectivehealth/unity';

// Flush $httpBackend, then run a digest cycle.
flush('http');

// Flush $timeout and $interval, then run a digest cycle.
flush('t', 'i');
```
