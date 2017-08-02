import getAll from '../../utils/getAll/get-all';

import {
  get,
  digest
} from '../../utils';


/**
 * Configures a service for testing.
 *
 * @param  {string} name - Name of the service being tested.
 * @param  {object} [opts] - Options object.
 * @param  {array} [opts.inject] - Attach additional injectables to the spec
 *   object, for convenience.
 * @return {object} - Spec object.
 */
export default function service(name, opts = {}) {
  const s = {};

  // Attach the service to the spec if it exists. If not, this will throw.
  s[name] = get(name);

  getAll(opts.inject, s);

  digest();

  return s;
}
