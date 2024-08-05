# PreactHeadMaster API Documentation

## Table of Contents

1. [Installation](#installation)
2. [Components](#components)
   - [HeadMasterProvider](#headmasterprovider)
   - [HeadMaster](#headmaster)
3. [Hooks](#hooks)
   - [useHeadMaster](#useheadmaster)
   - [useTitle](#usetitle)
   - [useMeta](#usemeta)
   - [useLink](#uselink)
   - [useScript](#usescript)
   - [useStyle](#usestyle)
   - [useHtmlAttributes](#usehtmlattributes)
   - [useBodyAttributes](#usebodyattributes)
4. [Server-Side Rendering](#server-side-rendering)
   - [renderStaticStream](#renderstaticstream)
   - [rewind](#rewind)
5. [Priority System](#priority-system)
6. [Error Handling](#error-handling)
7. [Nesting and Flattening](#nesting-and-flattening)
8. [TypeScript Support](#typescript-support)
9. [Performance Considerations](#performance-considerations)

## Installation

```bash
npm install preactheadmaster

# or

yarn add preactheadmaster
```

## Components

### HeadMasterProvider

The `HeadMasterProvider` component manages the HeadMaster state and should wrap your entire application.

#### Props

- `children`: React.ReactNode

#### Usage

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

### HeadMaster

The `HeadMaster` component is used to define head tags for your document. It provides a declarative way to define document head elements.

#### Props

- `title`: string
- `base`: Array<BaseTagAttributes>
- `meta`: Array<MetaTagAttributes>
- `link`: Array<LinkTagAttributes>
- `style`: Array<StyleTagAttributes>
- `script`: Array<ScriptTagAttributes>
- `noscript`: Array<NoscriptTagAttributes>
- `htmlAttributes`: object
- `bodyAttributes`: object

#### Usage

```jsx
import { HeadMaster } from 'preactheadmaster';

function MyComponent() {
  return (
    <HeadMaster
      title="My Page Title"
      meta={[
        { name: "description", content: "This is my page description" },
        { property: "og:type", content: "website" }
      ]}
      link={[{ rel: "canonical", href: "https://mysite.com" }]}
      script={[{ src: "https://example.com/script.js", async: true }]}
      htmlAttributes={{ lang: "en" }}
      bodyAttributes={{ class: "my-body-class" }}
    />
  );
}
```

## Hooks

### useHeadMaster

The main hook for accessing the HeadMaster context.

#### Returns

- `headMasterData`: The current HeadMaster state
- `updateHeadMasterData`: Function to update the HeadMaster state

#### Usage

```jsx
const { headMasterData, updateHeadMasterData } = useHeadMaster();
```

### useTitle

A hook for setting the document title.

#### Parameters

- `title`: string - The title to set for the document

#### Usage

```jsx
import { useTitle } from 'preactheadmaster';

function MyComponent() {
  useTitle('My Page Title');
  return <div>...</div>;
}
```

### useMeta

A hook for setting meta tags.

#### Parameters

- `metaTags`: Array of objects representing meta tag attributes

#### Usage

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

### useLink

A hook for setting link tags.

#### Parameters

- `linkTags`: Array of objects representing link tag attributes

#### Usage

```jsx
import { useLink } from 'preactheadmaster';

function MyComponent() {
  useLink([
    { rel: 'canonical', href: 'https://mysite.com/page' },
    { rel: 'stylesheet', href: '/styles.css' }
  ]);
  return <div>...</div>;
}
```

### useScript

A hook for setting script tags.

#### Parameters

- `scriptTags`: Array of objects representing script tag attributes

#### Usage

```jsx
import { useScript } from 'preactheadmaster';

function MyComponent() {
  useScript([
    { src: 'https://example.com/script.js', async: true },
    { innerHTML: `console.log('Hello, world!')` }
  ]);
  return <div>...</div>;
}
```

### useStyle

A hook for setting style tags.

#### Parameters

- `styleTags`: Array of objects representing style tag attributes

#### Usage

```jsx
import { useStyle } from 'preactheadmaster';

function MyComponent() {
  useStyle([
    { type: 'text/css', innerHTML: 'body { background-color: #f0f0f0; }' }
  ]);
  return <div>...</div>;
}
```

### useHtmlAttributes

A hook for setting HTML attributes.

#### Parameters

- `attributes`: Object containing HTML attributes

#### Usage

```jsx
import { useHtmlAttributes } from 'preactheadmaster';

function MyComponent() {
  useHtmlAttributes({ lang: 'en', class: 'my-html-class' });
  return <div>...</div>;
}
```

### useBodyAttributes

A hook for setting body attributes.

#### Parameters

- `attributes`: Object containing body attributes

#### Usage

```jsx
import { useBodyAttributes } from 'preactheadmaster';

function MyComponent() {
  useBodyAttributes({ class: 'my-body-class', 'data-theme': 'dark' });
  return <div>...</div>;
}
```

## Server-Side Rendering

### renderStaticStream

The `renderStaticStream` function is used for server-side rendering with streaming support.

#### Parameters

- `App`: The root component of your application

#### Returns

An async generator that yields chunks of HTML

#### Usage

```javascript
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

### rewind

The `rewind` function is used for synchronous server-side rendering. It collects all the head changes made up to this point and clears the internal state.

#### Returns

An object containing all collected head data.

#### Usage

```javascript
import { rewind } from 'preactheadmaster';
import { renderToString } from 'preact-render-to-string';
import App from './App';

function synchronousRender() {
  const appHtml = renderToString(<App />);
  const head = rewind();
  
  return `
    <!doctype html>
    <html ${head.htmlAttributes}>
      <head>
        ${head.title}
        ${head.meta}
        ${head.link}
        ${head.script}
      </head>
      <body ${head.bodyAttributes}>
        <div id="app">${appHtml}</div>
      </body>
    </html>
  `;
}
```

## Priority System

PreactHeadMaster implements a priority system for managing conflicting head elements. When multiple components attempt to set the same head element, the one with the highest priority (or most recently added) will take precedence.

To set a priority for a head element, include a `priority` property in the tag object:

```jsx
useMeta([
  { name: 'description', content: 'High priority description', priority: 2 },
  { name: 'description', content: 'Low priority description', priority: 1 }
]);
```

In this case, the "High priority description" will be used.

## Error Handling

PreactHeadMaster includes built-in error logging. If an error occurs during head updates, it will be logged to the console with the prefix `[PreactHeadMaster Error]:`. This helps in identifying and debugging issues specific to PreactHeadMaster.

For custom error handling, you can wrap your use of PreactHeadMaster components and hooks in try-catch blocks and handle errors as needed in your application.

```jsx
import { useHeadMaster } from 'preactheadmaster';

function MyComponent() {
  try {
    const { headMasterData, updateHeadMasterData } = useHeadMaster();
    // Use headMasterData or updateHeadMasterData
  } catch (error) {
    console.error('Error in PreactHeadMaster:', error);
    // Handle error as needed
  }
  return <div>...</div>;
}
```

## Nesting and Flattening

PreactHeadMaster supports nesting of HeadMaster components. When nested, the inner components' head elements will take precedence over the outer ones. All head elements are flattened into a single set when rendered.

```jsx
function NestedComponent() {
  return (
    <HeadMaster title="Outer Title">
      <div>
        <HeadMaster title="Inner Title" meta={[{ name: "description", content: "Inner description" }]} />
        <h1>Nested Component</h1>
      </div>
    </HeadMaster>
  );
}
```

In this example, the title "Inner Title" and the meta description "Inner description" will be included in the final head elements.

## TypeScript Support

PreactHeadMaster includes TypeScript definitions for all components, hooks, and functions. When using TypeScript, you'll get full type checking and autocompletion support.

## Performance Considerations

PreactHeadMaster is designed with performance in mind:

- Uses memoization to prevent unnecessary re-renders
- Implements a priority system for efficient management of conflicting head elements
- Supports streaming SSR for faster time-to-first-byte

For optimal performance:

1. Use the more specific hooks (e.g., `useTitle`, `useMeta`) instead of the general `HeadMaster` component when possible.
2. Avoid unnecessary updates by using memoization techniques when passing arrays or objects to HeadMaster or hooks.
3. Use the `useHeadMaster` hook for conditional updates instead of conditionally rendering `HeadMaster` components.

Remember to always measure the performance impact in your specific application, as the optimal usage may vary depending on your use case.
