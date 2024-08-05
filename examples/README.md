# PreactHeadMaster Examples

This directory contains example usage of PreactHeadMaster in various scenarios. These examples demonstrate how to use different features of the library in your Preact applications.

## List of Examples

1. [Basic Usage](#basic-usage)
2. [Hooks Usage](#hooks-usage)
3. [Dynamic Head Updates](#dynamic-head-updates)
4. [Server-Side Rendering](#server-side-rendering)

## Setup

Before running the examples, make sure you have Node.js and npm installed on your system. Then, follow these steps:

1. Navigate to the project root directory.
2. Install dependencies:
   ```
   npm install
   ```

## Running the Examples

### Basic Usage

This example demonstrates the basic usage of the `HeadMaster` component within a `HeadMasterProvider`.

To run:
```
npx preact-cli create app basic-usage
cd basic-usage
npm install preactheadmaster
```
Replace the contents of `src/index.js` with the code from `examples/basic-usage.js`.
Then run:
```
npm run dev
```

### Hooks Usage

This example shows how to use PreactHeadMaster hooks for more granular control over head elements.

Follow the same steps as for Basic Usage, but use the code from `examples/hooks-usage.js`.

### Dynamic Head Updates

This example demonstrates how to dynamically update head elements based on state changes.

Follow the same steps as for Basic Usage, but use the code from `examples/dynamic-updates.js`.

### Server-Side Rendering

This example shows how to use PreactHeadMaster with server-side rendering and client-side hydration.

For this example, you'll need to set up a simple server. Here's how you can do it with Express:

1. Create a new directory and initialize a new Node.js project:
   ```
   mkdir ssr-example
   cd ssr-example
   npm init -y
   ```

2. Install necessary dependencies:
   ```
   npm install express preact preactheadmaster @babel/register @babel/preset-env @babel/preset-react
   ```

3. Create a `.babelrc` file in the project root:
   ```json
   {
     "presets": ["@babel/preset-env", ["@babel/preset-react", { "pragma": "h" }]]
   }
   ```

4. Create a `server.js` file with the following content:
   ```javascript
   require('@babel/register')({
     presets: ['@babel/preset-env', ['@babel/preset-react', { pragma: 'h' }]]
   });

   const express = require('express');
   const { h } = require('preact');
   const render = require('preact-render-to-string');
   const { HeadMasterProvider, HeadMaster, renderStaticStream } = require('preactheadmaster');

   const app = express();

   app.get('/', async (req, res) => {
     const App = require('./examples/ssr-server.js').default;
     res.writeHead(200, { 'Content-Type': 'text/html' });

     for await (const chunk of renderStaticStream(App)) {
       res.write(chunk);
     }

     res.end();
   });

   app.listen(3000, () => {
     console.log('Server running on http://localhost:3000');
   });
   ```

5. Copy `examples/ssr-server.js` and `examples/ssr-client.js` to your project.

6. Run the server:
   ```
   node server.js
   ```

7. Visit `http://localhost:3000` in your browser to see the server-rendered page.

## Note

These examples are meant to demonstrate the usage of PreactHeadMaster and may not include all best practices for building production applications. Always refer to the main documentation for complete information on using PreactHeadMaster in your projects.
