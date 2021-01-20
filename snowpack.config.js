module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: [
    [
      "@snowpack/plugin-webpack",
      {
        extendConfig: (config) => {
          // The two sets of polyfills are NOT absolute requirements and depend on the D3 libraries you wish to import into your project. They can be commented out if the library does not require them.
          config.entry.index = [
            // According to MDN documentation, `new TypedArray(iterable)` syntax is not supported by IE, but typed arrays, in general, are supported by IE. Babel is unable to detect this difference when adding polyfills. D3 uses four typed arrays in all of its constituent libraries: `Float32Array`, `Float64Array`, `Int32Array` and `Uint32Array`.
            // Example: The source code of d3-contour contains the syntax `new Float32Array`.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array
            // Polyfills add ~32 KiB to `index.js` output.
            "core-js/features/typed-array/float32-array",
            "core-js/features/typed-array/float64-array",
            "core-js/features/typed-array/int32-array",
            "core-js/features/typed-array/uint32-array",
            // d3-fetch (`d3.csv`, `d3.json`, `d3.tsv`, etc.) methods are transpiled down to `window.fetch`.
            // Babel only polyfills ECMAScript methods, not web specifications like `window.fetch`.
            // https://github.com/babel/babel/issues/9160#issuecomment-446134854
            // Polyfill adds ~14 KiB to `index.js` output.
            "whatwg-fetch",
            config.entry.index,
          ];

          // Exclude the following modules from being transpiled.
          config.module.rules[0].exclude = [
            // https://github.com/zloirock/core-js/issues/743#issuecomment-572074215
            /\bcore-js\b/,
            /\bwebpack\/buildin\b/,
            // Resolves the following issue printed in the dev. console:
            // Uncaught TypeError: _typeof2 is not a function
            /@babel\/runtime-corejs3/,
          ];

          // Resolves the following issue printed in the dev. console:
          // TypeError: __webpack_require__(...) is not a function
          // https://github.com/webpack/webpack/issues/9379#issuecomment-509628205
          config.module.rules[0].use[0].options.sourceType = "unambiguous";

          // Already set by default via `@snowpack/plugin-webpack` configuration.
          //
          // {
          //    useBuiltIns: 'usage'
          //    corejs: 3
          // }
          //
          // useBuiltIns does the following:
          // - Adds core-js polyfills for detected features.
          // - Uses native API's for runtime (helper) code. This prvents things like `_extends` from being added to the code when `Object.assign()` is supported for all browsers. However, `preset-env` should not include polyfills for these since they are handled elsewhere. Add the following `exclude` list to hook into this behavior.
          //
          // This decreases the `index.js` output by ~46 KiB.
          config.module.rules[0].use[0].options.presets[0][1].exclude = [
            /^(es|es6|es7|esnext|web)\./,
          ];

          // Print out the polyfills automatically added by Babel based on `browserslist` set in `package.json`.
          config.module.rules[0].use[0].options.presets[0][1].debug = true;

          config.module.rules[0].use[0].options.plugins = [
            [
              // Require the Babel runtime as a separate module to avoid duplication and to provide `regeneratorRuntime` when using generators/async functions.
              // https://webpack.js.org/loaders/babel-loader/#babel-is-injecting-helpers-into-each-file-and-bloating-my-code
              "@babel/plugin-transform-runtime",
              {
                // Requires `@babel/runtime-corejs3`.
                // https://babeljs.io/blog/2019/03/19/7.4.0#migration-from-core-js-2
                corejs: { version: 3 },
              },
            ],
          ];

          return config;
        },
      },
    ],
  ],
};
