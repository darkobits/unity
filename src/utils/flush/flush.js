import {
  get,
  digest
} from '../';

/**
 * Flushes common asynchronous Angular services, then run a digest cycle.
 *
 * @param  {arglist} args - Services to flush.
 */
export default function flush(...services) {
  services.forEach(service => {
    switch (service) {
      case 'h':
      case 'http':
        get('$httpBackend').flush();
        break;
      case 't':
      case 'timeout':
        get('$timeout').flush();
        break;
      case 'i':
      case 'interval':
        get('$interval').flush();
        break;
      case 'a':
      case 'animate':
        get('$animate').flush();
        break;
      default:
        throw new Error(`[Unity.flush] Unknown token: "${service}"`);
    }
  });

  digest();
}
