# PreactHeadMaster API Documentation

## Table of Contents

1. [Components](#components)
   - [HeadMasterProvider](#headmasterprovider)
   - [HeadMaster](#headmaster)
2. [Hooks](#hooks)
   - [useHeadMaster](#useheadmaster)
   - [useTitle](#usetitle)
   - [useMeta](#usemeta)
   - [useLink](#uselink)
   - [useScript](#usescript)
   - [useHtmlAttributes](#usehtmlattributes)
   - [useBodyAttributes](#usebodyattributes)
3. [Server-Side Rendering](#server-side-rendering)
   - [renderStaticStream](#renderstaticstream)

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

The `HeadMaster` component is used to define head tags for your document.

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
