import angular from 'angular';

import {
  get
} from '../';


/**
 * Compiles the provided template string using the provided scope. If no scope
 * was provided, a new one will be created.
 *
 * @example
 *
 * let scope = get('$rootScope').$new();
 * scope.foo = 'bar';
 *
 * let el = compile('<div>{{ foo }}</div>')(scope);
 * el.find('div').innerHTML; // 'foo'
 *
 * @param  {string} options.template - Template string.
 * @param  {object} [options.scope] - Optional scope to use.
 * @param  {object} [options.insertAt] - jqLite element in an existing DOM
 *   structure at which to insert the element *prior* to compilation. Useful
 *   when working with directives that will immediately try to `require` a
 *   parent directive upon compilation.
 * @return {object} - Compiled DOM element.
 */
export function compile ({template, scope = {}, insertAt} = {}) {
  if (!template || typeof template !== 'string') {
    throw new Error('[Unity] Compile requires a "template" option.');
  }

  const insertEl = angular.element(insertAt);

  let $scope;

  if (typeof scope === 'object' && scope.$id) {
    // User provided an actual scope. Use it.
    $scope = scope;
  } else {
    // User provided an object, merge its properties onto the scope.
    $scope = insertEl.scope() || get('$rootScope').$new();
    Object.assign($scope, scope);
  }

  // Insert the element into an existing DOM strucutre prior to compiling.
  if (insertAt) {
    const el = angular.element(template);
    insertAt.append(el);
    return get('$compile')(el)($scope);
  }

  return get('$compile')(template)($scope);
}
