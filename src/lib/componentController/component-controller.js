import angular from 'angular';
import getAll from '../../utils/getAll/get-all';

import {
  get,
  digest
} from '../../utils';


/**
 * Prepare a component's controller for testing.
 *
 * @param  {string} name - Component name.
 * @param  {object} opts - Options object.
 * @param  {object} [opts.locals] - Injection locals for the controller, will
 *   override the default injectable that the controller asks for. Useful for
 *   mocking injectables like $element.
 * @param  {object} [opts.bindings] - Optional bindings to pass to the
 *   controller instance.
 * @param  {array} [opts.scope] - Properties of the components's parent scope.
 * @param  {array} [opts.inject] - Attach additional injectables to the spec
 *   object, for convenience.
 * @param  {boolean} [opts.init=true] - Whether to automatically call the
 *   component's $onInit method. Defaults to `true`.
 * @return {object} - Spec object.
 */
export default function componentController(name, opts = {}) {
  const s = {};

  opts = Object.assign({}, {
    init: true,
    locals: {}
  }, opts);

  // Ensure the injector has the component. This will throw if it doesn't.
  const componentDefinition = [].concat(get(`${name}Directive`))[0];

  // Create a new scope that inherits from $rootScope for testing the component.
  s.$scope = get('$rootScope').$new(true);

  if (opts.scope) {
    s.$scope.$apply(() => Object.assign(s.$scope, opts.scope));
  }

  // Create a new mock element.
  s.$element = angular.element('<div></div>');

  // Attach component's controller.
  s[name] = get('$componentController')(name, Object.assign({
    $attrs: {}
  }, opts.locals, {
    $scope: s.$scope,
    $element: s.$element
  }), opts.bindings);

  // If the component specifies a "controllerAs" alias, attach a reference to
  // the component's controller instance to its $scope under the controller as
  // alias.
  if (componentDefinition.controllerAs) {
    s.$scope[componentDefinition.controllerAs] = s[name];
  }

  // Run the controller's $onInit lifecycle method, if it defines one.
  if (opts.init && typeof s[name].$onInit === 'function') {
    s[name].$onInit();
  }

  getAll(opts.inject, s);

  digest();

  return s;
}
