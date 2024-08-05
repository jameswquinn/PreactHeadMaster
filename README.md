# PreactHeadMaster

[![npm version](https://badge.fury.io/js/preactheadmaster.svg)](https://badge.fury.io/js/preactheadmaster)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

PreactHeadMaster is a powerful document head manager for Preact applications. It allows you to dynamically update the `<head>` section of your HTML document, including title, meta tags, and more, with ease and efficiency.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Hook-based Usage](#hook-based-usage)
- [Server-Side Rendering](#server-side-rendering)
- [API Reference](#api-reference)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🚀 Lightweight and optimized for Preact
- 🔄 Dynamic updates to document head
- 🎣 Hook-based API for easy integration
- 🖥️ Server-side rendering support
- 📦 TypeScript support

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

## Server-Side Rendering

PreactHeadMaster supports server-side rendering. Use the `renderStatic` function after rendering your app:

```javascript
import { renderToString } from 'preact-render-to-string';
import { renderStatic, generateFullDocument } from 'preactheadmaster';
import App from './App';

function serverRender() {
  const appHtml = renderToString(<App />);
  const { headMaster } = renderStatic();
  return generateFullDocument(headMaster, appHtml);
}
```

## API Reference

For a complete API reference, please see our [API Documentation](API.md).

## FAQ

For answers to common questions, please check our [FAQ](FAQ.md).

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

PreactHeadMaster is [MIT licensed](LICENSE).
