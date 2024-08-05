# PreactHeadMaster

PreactHeadMaster is a powerful and efficient document head manager for Preact applications. It allows you to dynamically update the `<head>` section of your HTML document, including title, meta tags, and more, with ease and performance in mind.

[![npm version](https://badge.fury.io/js/preactheadmaster.svg)](https://badge.fury.io/js/preactheadmaster)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 Lightweight and optimized for Preact
- 🔄 Dynamic updates to document head
- 🎣 Hook-based API for easy integration
- 🖥️ Server-side rendering support with streaming capabilities
- 📦 TypeScript support
- 🏆 Priority system for managing conflicting head elements
- 🚀 Performance optimizations with memoization
- 🐛 Robust error handling and logging

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Hook-based Usage](#hook-based-usage)
  - [Server-Side Rendering](#server-side-rendering)
- [API Reference](#api-reference)
- [Performance Considerations](#performance-considerations)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install preactheadmaster
```

or

```bash
yarn add preactheadmaster
```

## Quick Start

1. Wrap your app with `HeadMasterProvider`:

```jsx
import { h } from 'preact';
import { HeadMasterProvider } from 'preactheadmaster';

function App() {
  return (
    <HeadMasterProvider>
      {/* Your app components */}
    </HeadMasterProvider>
  );
}
```

2. Use the `HeadMaster` component or hooks in your components:

```jsx
import { h } from 'preact';
import { HeadMaster, useTitle } from 'preactheadmaster';

function MyComponent() {
  useTitle('My Page Title');

  return (
    <div>
      <HeadMaster>
        <meta name="description" content="This is my page description" />
        <link rel="canonical" href="https://mysite.com/page" />
      </HeadMaster>
      <h1>My Component</h1>
    </div>
  );
}
```

## Usage

### Basic Usage

Use the `HeadMaster` component to manage your document head:

```jsx
import { h } from 'preact';
import { HeadMaster } from 'preactheadmaster';

function MyComponent() {
  return (
    <div>
      <HeadMaster>
        <title>My Page Title</title>
        <meta name="description" content="This is my page description" />
        <link rel="canonical" href="https://mysite.com/page" />
      </HeadMaster>
      <h1>My Component</h1>
    </div>
  );
}
```

### Hook-based Usage

PreactHeadMaster provides hooks for more granular control:

```jsx
import { h } from 'preact';
import { useTitle, useMeta, useLink } from 'preactheadmaster';

function MyComponent() {
  useTitle('My Page Title');
  useMeta([{ name: 'description', content: 'This is my page description' }]);
  useLink([{ rel: 'canonical', href: 'https://mysite.com/page' }]);

  return <h1>My Component</h1>;
}
```

### Server-Side Rendering

PreactHeadMaster supports server-side rendering with streaming capabilities:

```javascript
import { renderToString } from 'preact-render-to-string';
import { renderStaticStream } from 'preactheadmaster';
import App from './App';

async function serverRender(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  for await (const chunk of renderStaticStream(App)) {
    res.write(chunk);
  }

  res.end();
}
```

## API Reference

For a complete API reference, please see our [API Documentation](API.md).

## Performance Considerations

PreactHeadMaster is designed with performance in mind:

- Uses memoization to prevent unnecessary re-renders
- Implements a priority system for efficient management of conflicting head elements
- Supports streaming SSR for faster time-to-first-byte

## Error Handling

PreactHeadMaster includes robust error handling:

- Centralized error logging for easier debugging
- Graceful handling of runtime errors to prevent app crashes

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

PreactHeadMaster is [MIT licensed](LICENSE).
