### `compile(options: object): object`

**Note:** This method is designed to help test complex directives that are sensitive to their surrounding DOM elements (particularly, directives that `require` parent/sibling controllers) and should not be needed in most cases.

Compiles the provided template string. Can optionally use a provided scope and can insert the element into an existing DOM tree prior to compilation.

|Name|Type|Description|
|---|---|---|
|`options`|`object`|Options object.|
|`options.template`|`string`|Template to compile.|
|`[options.scope]`|`object`|(Optional) Scope to use when compiling the template.|
|`[options.insertAt]`|`object`|(Optional) jqLite element to `append` the element to just prior to compilation.|

**Returns:**

`object` - Compiled element.

**Example:**

Here, we are testing `FooDirective`, which is `required` by `BarDirective`. We want to test how `FooDirective` behaves when we insert a `BarDirective` (or multiple `BarDirectives`) into the DOM as children of `FooDirective`. We can use the standard approach of assigning `FooDirective` to our shared variable, `T`. We can then use `compile` to create an instance of `BarDirective` and insert it into `FooDirective`'s template.

```js
import {
  compile,
  directive,
  module
} from '@darkobits/unity';

describe('Foo Directive', () => {
  let T;

  beforeEach(() => {
    module('FooModule');

    T = directive('FooDirective', {
      template: `
        <foo some-attr="quz">
          <baz></baz>
          <transclude></transclude>
        </foo>
      `
    });
  });

  describe('when bar-attr is "true"', () => {
    let Bar;

    beforeEach(() => {
      compile({
        template: `
          <bar bar-attr="true"></bar>
        `,
        insertAt: T.$element.find('transclude')
      });
    });

    it('should be bar-tastic', () => {
        // Here, we now have a reference to Foo (and its element, scope, etc) via T, and to Bar's controller via Bar.
    });
  });

  describe('when bar-attr is "false"', () => {
    let Bar;

    beforeEach(() => {
      compile({
        template: `
          <bar bar-attr="false"></bar>
        `,
        insertAt: T.$element.find('transclude')
      });
    });

    it('should be bar-tastic', () => {
        // Here, we now have a reference to Foo (and its element, scope, etc) via T, and to Bar's controller via Bar.
    });
  });
});
```
