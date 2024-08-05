# PreactHeadMaster FAQ

## Table of Contents

1. [General Questions](#general-questions)
2. [Usage Questions](#usage-questions)
3. [Performance Questions](#performance-questions)
4. [Server-Side Rendering Questions](#server-side-rendering-questions)
5. [Compatibility Questions](#compatibility-questions)
6. [Troubleshooting](#troubleshooting)

## General Questions

### What is PreactHeadMaster?

PreactHeadMaster is a library for Preact applications that allows you to manage the document head. It provides a way to dynamically update meta tags, title, and other head elements in your Preact applications.

### How does PreactHeadMaster differ from react-helmet?

While PreactHeadMaster is inspired by react-helmet, it's specifically designed for Preact applications. Key differences include:
- Optimized for Preact's smaller size and faster rendering
- Additional hooks for more granular control
- Improved TypeScript support
- Better performance due to Preact's efficiency

### Why the name "PreactHeadMaster"?

The name "PreactHeadMaster" was chosen to clearly indicate its purpose (managing the head of a document) and its association with Preact. It also distinguishes it from other similar libraries while hinting at its comprehensive control over head elements.

### Is PreactHeadMaster suitable for production use?

Yes, PreactHeadMaster is designed for production use. It's built with performance and reliability in mind, and it's based on well-established patterns for managing document head elements in Preact applications.

## Usage Questions

### Do I need to wrap my entire app with HeadMasterProvider?

Yes, you should wrap your root component with `HeadMasterProvider` to ensure that the HeadMaster context is available throughout your application.

```jsx
import { HeadMasterProvider } from 'preactheadmaster';

function App() {
  return (
    <HeadMasterProvider>
      {/* Your app components */}
    </HeadMasterProvider>
  );
}
```

### Can I use both the HeadMaster component and hooks in the same application?

Absolutely! You can use the `HeadMaster` component for static head management and hooks for more dynamic updates or when you need more granular control.

### How do I update the document title dynamically?

You can use the `useTitle` hook to update the title dynamically:

```jsx
import { useTitle } from 'preactheadmaster';

function MyComponent() {
  useTitle(`Page ${currentPage}`);
  // ...
}
```

### Can I use PreactHeadMaster with class components?

Yes, you can use the `HeadMaster` component with class components. For hooks, you'll need to use function components or create a wrapper function component.

## Performance Questions

### Does PreactHeadMaster affect my app's performance?

PreactHeadMaster is designed to be lightweight and efficient. It only updates the DOM when necessary and batches updates for optimal performance. However, like any library, excessive use (e.g., updating head tags very frequently) could potentially impact performance.

### How can I optimize PreactHeadMaster for better performance?

- Use the more specific hooks (e.g., `useTitle`, `useMeta`) instead of the general `HeadMaster` component when possible.
- Avoid unnecessary updates by using memoization techniques when passing arrays or objects to HeadMaster or hooks.
- Use the `useHeadMaster` hook for conditional updates instead of conditionally rendering `HeadMaster` components.

## Server-Side Rendering Questions

### How do I use PreactHeadMaster with server-side rendering?

Use the `renderStatic` function after rendering your app to string, then use `generateFullDocument` to create the full HTML document:

```javascript
import { renderToString } from 'preact-render-to-string';
import { renderStatic, generateFullDocument } from 'preactheadmaster';

function serverRender() {
  const appHtml = renderToString(<App />);
  const { headMaster } = renderStatic();
  return generateFullDocument(headMaster, appHtml);
}
```

### Does PreactHeadMaster work with streaming SSR?

Currently, PreactHeadMaster doesn't support streaming SSR out of the box. It collects all head data after the entire app has been rendered. For streaming SSR, you might need to implement a custom solution.

## Compatibility Questions

### Can I use PreactHeadMaster with other Preact libraries?

Yes, PreactHeadMaster is designed to work seamlessly with other Preact libraries and doesn't interfere with normal Preact operations.

### Is PreactHeadMaster compatible with all Preact versions?

PreactHeadMaster is compatible with Preact 10.x and above. Make sure to check the package.json for specific version requirements.

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

You can use the `useHeadMaster` hook to log changes to the HeadMaster data:

```jsx
import { useHeadMaster } from 'preactheadmaster';

function DebugComponent() {
  const { headMasterData } = useHeadMaster();
  console.log('HeadMaster data:', headMasterData);
  return null;
}
```

This will help you track when and how your head data is changing.

### I've migrated from react-helmet, but some features are missing. What should I do?

While PreactHeadMaster aims to cover most use cases of react-helmet, there might be some specific features that are implemented differently or not available. Check the API documentation for alternative approaches, or open an issue on the PreactHeadMaster GitHub repository for feature requests.

If you have any more questions or need further clarification, please don't hesitate to ask!
