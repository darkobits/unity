import getAll from '../../utils/getAll/get-all';

import {
  get,
  digest
} from '../../utils';


/**
 * Prepares a filter for testing.
 *
 * @param  {string} name - Name of the filter.
 * @param  {object} [opts] - Options object.
 * @param  {array} [opts.inject] - Attach additional injectables to the spec
 *   object, for convenience.
 * @return  {object} - Spec object.
 */
export default function filter(name, opts = {}) {
  const s = {};

  s[name] = get('$filter')(name);

  getAll(opts.inject, s);

  digest();

  return s;
}
