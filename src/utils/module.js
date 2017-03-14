import angular from 'angular';

let $providerInjector;


/**
 * Instantiates a module. By default, ui-router's `$urlRouter` is mocked to
 * prevent the router from interfering with tests. This can be disabled if
 * needed. Additional mocked injectables can be specified.
 *
 * @example
 *
 * import {
 *   module,
 *   get
 * } from '@collectivehealth/unity';
 *
 * describe('MyAwesomeSpec', () => {
 *   let T;
 *
 *   beforeEach(() => {
 *     module('MyAwesomeApp', {
 *       mock: {
 *         SomeAwesomeService: {
 *           callApi: function () {
 *             return get('$q').resolve()
 *           },
 *           logOut: function () {
 *             return true;
 *           }
 *         }
 *       }
 *     });
 *   });
 *
 *   // ...
 * });
 *
 * @param {string} module - Module to load.
 * @param {object} [opts] - Options object.
 * @param {boolean} [opts.disableUiRouter=true] - Whether to disable ui-router.
 * @param {object} [opts.mock] - Object with values that will be used to
 *   create mocked injectables.
 */
export function module (module, opts = {}) {
  opts = Object.assign({
    disableUrlRouter: true
  }, opts);

  angular.mock.module(module, ($provide, $injector) => {
    $providerInjector = $injector;

    if (opts.disableUrlRouter) {
      try {
        $injector.get('$urlRouterProvider').deferIntercept();
      } catch (err) {
        // Application does not use ui-router.
      }
    }

    if (opts.mock) {
      Object.keys(opts.mock).forEach(name => {
        const value = opts.mock[name];
        $provide.value(name, value);
      });
    }
  });

  angular.mock.inject();
}


/**
 * Returns the injector needed to access providers, saved after a module is
 * instantiated.
 *
 * @return {object}
 */
export function getProviderInjector () {
  return $providerInjector;
}
