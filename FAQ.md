# PreactHeadMaster FAQ

Version: 1.0.0
Last Updated: 2023-05-21

This FAQ covers the latest version of PreactHeadMaster, including all recent improvements such as the priority system, performance optimizations, expanded SSR capabilities, and enhanced error handling.

## Table of Contents

1. [General Questions](#general-questions)
2. [Installation and Setup](#installation-and-setup)
3. [Usage Questions](#usage-questions)
4. [Performance Optimization](#performance-optimization)
5. [Server-Side Rendering](#server-side-rendering)
6. [Compatibility](#compatibility)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contributing)

## General Questions

### What is PreactHeadMaster?

PreactHeadMaster is a lightweight and efficient library for Preact applications that allows you to manage the document head. It provides a way to dynamically update meta tags, title, and other head elements in your Preact applications.

### How does PreactHeadMaster differ from react-helmet?

While PreactHeadMaster is inspired by react-helmet, it's specifically designed for Preact applications. Key differences include:
- Optimized for Preact's smaller size and faster rendering
- Additional hooks for more granular control
- Improved TypeScript support
- Better performance due to Preact's efficiency
- Built-in priority system for managing conflicting head elements
- Streaming SSR support

### Is PreactHeadMaster suitable for production use?

Yes, PreactHeadMaster is designed for production use. It's built with performance and reliability in mind, and includes features like error handling and a priority system for managing conflicting head elements.

## Installation and Setup

### How do I install PreactHeadMaster?

You can install PreactHeadMaster using npm or yarn:

```bash
npm install preactheadmaster

# or

yarn add preactheadmaster
```

### How do I set up PreactHeadMaster in my application?

Wrap your root component with `HeadMasterProvider`:

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

## Usage Questions

### How do I update the document title?

You can use the `useTitle` hook:

```jsx
import { useTitle } from 'preactheadmaster';

function MyComponent() {
  useTitle('My Page Title');
  return <div>...</div>;
}
```

### How do I add meta tags?

Use the `useMeta` hook:

```jsx
import { useMeta } from 'preactheadmaster';

function MyComponent() {
  useMeta([
    { name: 'description', content: 'My page description' },
    { property: 'og:title', content: 'My Open Graph Title' }
  ]);
  return <div>...</div>;
}
```

### Can I use both the HeadMaster component and hooks in the same application?

Yes, you can use both the `HeadMaster` component for static head management and hooks for more dynamic updates or when you need more granular control.

### How does the priority system work?

PreactHeadMaster includes a priority system for managing conflicting head elements. When multiple components try to set the same head element, the one with the highest priority (or added most recently) will take precedence. You can set priorities like this:

```jsx
useMeta([
  { name: 'description', content: 'High priority description', priority: 2 },
  { name: 'description', content: 'Low priority description', priority: 1 }
]);
```

## Performance Optimization

### How can I optimize PreactHeadMaster for better performance?

- Use the more specific hooks (e.g., `useTitle`, `useMeta`) instead of the general `HeadMaster` component when possible.
- Avoid unnecessary updates by using memoization techniques when passing arrays or objects to HeadMaster or hooks.
- Use the `useHeadMaster` hook for conditional updates instead of conditionally rendering `HeadMaster` components.

### Does PreactHeadMaster affect my app's performance?

PreactHeadMaster is designed to be lightweight and efficient. It only updates the DOM when necessary and batches updates for optimal performance. It also uses memoization to prevent unnecessary re-renders. However, like any library, excessive use (e.g., updating head tags very frequently) could potentially impact performance.

## Server-Side Rendering

### How do I use PreactHeadMaster with server-side rendering?

PreactHeadMaster supports server-side rendering with streaming capabilities. Use the `renderStaticStream` function:

```javascript
import { renderStaticStream } from 'preactheadmaster';

async function serverRender(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  for await (const chunk of renderStaticStream(App)) {
    res.write(chunk);
  }

  res.end();
}
```

### Does PreactHeadMaster support streaming SSR?

Yes, PreactHeadMaster supports streaming SSR out of the box. The `renderStaticStream` function returns an async generator that yields chunks of HTML, allowing for streaming rendering.

## Compatibility

### Is PreactHeadMaster compatible with all Preact versions?

PreactHeadMaster is compatible with Preact 10.x and above. Make sure to check the package.json for specific version requirements.

### Can I use PreactHeadMaster with other Preact libraries?

Yes, PreactHeadMaster is designed to work seamlessly with other Preact libraries and doesn't interfere with normal Preact operations.

### Can I use PreactHeadMaster in a project that's migrating from React to Preact?

Yes, PreactHeadMaster can be a good replacement for react-helmet when migrating from React to Preact. Its API is intentionally similar to react-helmet to ease the transition, but it's optimized for Preact's architecture.

## Troubleshooting

### Why aren't my head tags updating?

Common reasons include:
1. Forgetting to wrap your app with `HeadMasterProvider`
2. Using hooks outside of a function component
3. Incorrect nesting of `HeadMaster` components

### I'm getting a "useHeadMaster must be used within a HeadMasterProvider" error. What's wrong?

This error occurs when you try to use a PreactHeadMaster hook outside of the `HeadMasterProvider` context. Make sure you've wrapped your root component with `HeadMasterProvider`.

### How can I debug PreactHeadMaster?

PreactHeadMaster includes built-in error logging. Errors are logged to the console with the prefix `[PreactHeadMaster Error]:`. You can also use the `useHeadMaster` hook to log changes to the HeadMaster data:

```jsx
import { useHeadMaster } from 'preactheadmaster';

function DebugComponent() {
  const { headMasterData } = useHeadMaster();
  console.log('HeadMaster data:', headMasterData);
  return null;
}
```

## Contributing

### How can I contribute to PreactHeadMaster?

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details on how to submit issues, create pull requests, and more.

### I've found a bug. How do I report it?

Please open an issue on our GitHub repository. Provide as much detail as possible, including a minimal reproducible example if you can.

### I have a feature request. How do I suggest it?

Feature requests are welcome! Please open an issue on our GitHub repository describing the feature you'd like to see, why you need it, and how it should work.

If you have any more questions or need further clarification, please don't hesitate to ask or open an issue on our GitHub repository!
