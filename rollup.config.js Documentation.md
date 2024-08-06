# Rollup Configuration Documentation

This document explains the `rollup.config.js` file used for building Preact applications. The configuration is designed to be flexible, supporting both library and application development with Preact.

## Table of Contents

1. [Overview](#overview)
2. [Imports](#imports)
3. [Configuration Variables](#configuration-variables)
4. [Babel Options](#babel-options)
5. [Common Plugins](#common-plugins)
6. [Build Configurations](#build-configurations)
7. [Development Server](#development-server)
8. [Usage](#usage)
9. [Customization](#customization)

## Overview

This Rollup configuration generates multiple build formats (ESM, CommonJS, UMD) and includes a development server. It handles JavaScript/JSX, CSS, and images, and optimizes the build for production.

## Imports

```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import pkg from './package.json' assert { type: 'json' };
```

These imports bring in various Rollup plugins and utilities:

- `resolve`: Resolves module imports
- `commonjs`: Converts CommonJS modules to ES6
- `babel`: Transpiles code with Babel
- `terser`: Minifies JavaScript
- `postcss`: Processes CSS
- `image`: Imports images as base64-encoded strings
- `serve`: Provides a development server
- `livereload`: Adds live reloading to the development server
- `replace`: Replaces strings in the code
- `pkg`: Imports the `package.json` file

## Configuration Variables

```javascript
const production = !process.env.ROLLUP_WATCH;
const input = 'src/index.js';
const external = ['preact', 'preact/hooks'];
```

- `production`: Determines if this is a production build
- `input`: The entry point of your application
- `external`: External dependencies that shouldn't be bundled

## Babel Options

```javascript
const babelOptions = {
  babelHelpers: 'bundled',
  presets: [
    ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
    ['@babel/preset-react', { pragma: 'h', pragmaFrag: 'Fragment' }]
  ],
  plugins: [
    ['@babel/plugin-transform-react-jsx', { pragma: 'h', pragmaFrag: 'Fragment' }]
  ],
  exclude: 'node_modules/**'
};
```

These options configure Babel to:
- Use bundled helpers
- Target modern browsers
- Transform JSX for Preact
- Exclude `node_modules` from transpilation

## Common Plugins

```javascript
const commonPlugins = [
  resolve({ browser: true, extensions: ['.js', '.jsx'] }),
  commonjs(),
  babel(babelOptions),
  postcss({ extensions: ['.css'], minimize: production, extract: 'styles.css' }),
  image(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
    preventAssignment: true
  })
];
```

This array defines plugins used in all build configurations:
- `resolve`: Resolves dependencies
- `commonjs`: Converts CommonJS to ES modules
- `babel`: Transpiles code
- `postcss`: Processes and extracts CSS
- `image`: Handles image imports
- `replace`: Sets the `NODE_ENV` environment variable

## Build Configurations

The configuration generates three build formats:

1. ESM (ECMAScript Module):
   ```javascript
   {
     input,
     external,
     output: {
       file: pkg.module,
       format: 'esm',
       sourcemap: !production
     },
     plugins: [
       ...commonPlugins,
       production && terser()
     ].filter(Boolean)
   }
   ```

2. CommonJS:
   ```javascript
   {
     input,
     external,
     output: {
       file: pkg.main,
       format: 'cjs',
       sourcemap: !production
     },
     plugins: [
       ...commonPlugins,
       production && terser()
     ].filter(Boolean)
   }
   ```

3. UMD (Universal Module Definition):
   ```javascript
   {
     input,
     external,
     output: {
       file: pkg.browser,
       format: 'umd',
       name: 'PreactApp',
       globals: {
         preact: 'preact',
         'preact/hooks': 'preactHooks'
       },
       sourcemap: !production
     },
     plugins: [
       ...commonPlugins,
       production && terser()
     ].filter(Boolean)
   }
   ```

Each configuration specifies:
- Input file
- External dependencies
- Output format and file
- Plugins (including Terser for production builds)

## Development Server

```javascript
if (!production) {
  configs.push({
    input,
    output: {
      file: 'public/bundle.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      ...commonPlugins,
      serve({
        contentBase: ['public'],
        open: true,
        port: 3000
      }),
      livereload('public')
    ]
  });
}
```

This configuration is added for development builds. It:
- Outputs an IIFE (Immediately Invoked Function Expression) bundle
- Serves the `public` directory
- Enables live reloading

## Usage

To use this configuration:

1. For development: `npm run dev`
2. For production build: `npm run build`

Ensure your `package.json` has the following scripts:

```json
"scripts": {
  "build": "rollup -c",
  "dev": "rollup -c -w",
  "start": "sirv public --single"
}
```

## Customization

- To add or modify plugins, edit the `commonPlugins` array.
- To change the entry point, modify the `input` variable.
- To add more external dependencies, add them to the `external` array.
- To modify Babel settings, edit the `babelOptions` object.
- To change build targets, modify the respective configuration objects.
