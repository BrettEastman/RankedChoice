<script context="module">
  var hasOwn = {}.hasOwnProperty;
  export function _cx() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = typeof arg;

      if (argType === "string" || argType === "number") {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
          var inner = _cx.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (argType === "object") {
        if (
          arg.toString !== Object.prototype.toString &&
          !arg.toString.toString().includes("[native code]")
        ) {
          classes.push(arg.toString());
          continue;
        }

        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(" ");
  }
</script>

<!--
@component
A simple utility for conditionally joining classNames together, similar to the npm package named 'classnames'; This version is based on the Woodshed version.
Usage examples
```js
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
 // lots of arguments of various types
 classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

 // other falsy values are just ignored
 classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
 ```

 Copied from: https://github.com/JedWatson/classnames/blob/5c6082bcd310862b15e7e99d9e2173759967cebe/index.js
 More documentation: https://github.com/JedWatson/classnames/tree/5c6082bcd310862b15e7e99d9e2173759967cebe#readme
-->
