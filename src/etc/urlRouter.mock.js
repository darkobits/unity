/**
 * Mocks ui-router's $urlRouter so that applications will not initiate routing
 * when loaded.
 */
export class MockUrlRouterProvider {
  rule () {
    return this;
  }
  when () {
    return this;
  }
  otherwise () {
    return this;
  }
  $get () {
    return {
      sync: () => {}
    };
  }
}
