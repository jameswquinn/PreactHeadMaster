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
   - [renderStatic](#renderstatic)
   - [generateFullDocument](#generatefulldocument)

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

useTitle('My Page Title');
```

### useMeta

A hook for setting meta tags.

#### Parameters

- `metaTags`: Array of objects representing meta tag attributes

#### Usage

```jsx
import { useMeta } from 'preactheadmaster';

useMeta([
  { name: 'description', content: 'My page description' },
  { property: 'og:title', content: 'My Open Graph Title' }
]);
```

### useLink

A hook for setting link tags.

#### Parameters

- `linkTags`: Array of objects representing link tag attributes

#### Usage

```jsx
import { useLink } from 'preactheadmaster';

useLink([
  { rel: 'canonical', href: 'https://mysite.com/page' },
  { rel: 'stylesheet', href: '/styles.css' }
]);
```

### useScript

A hook for setting script tags.

#### Parameters

- `scriptTags`: Array of objects representing script tag attributes

#### Usage

```jsx
import { useScript } from 'preactheadmaster';

useScript([
  { src: 'https://example.com/script.js', async: true },
  { innerHTML: `console.log('Hello, world!')` }
]);
```

### useHtmlAttributes

A hook for setting HTML attributes.

#### Parameters

- `attributes`: Object containing HTML attributes

#### Usage

```jsx
import { useHtmlAttributes } from 'preactheadmaster';

useHtmlAttributes({ lang: 'en', class: 'my-html-class' });
```

### useBodyAttributes

A hook for setting body attributes.

#### Parameters

- `attributes`: Object containing body attributes

#### Usage

```jsx
import { useBodyAttributes } from 'preactheadmaster';

useBodyAttributes({ class: 'my-body-class', 'data-theme': 'dark' });
```

## Server-Side Rendering

### renderStatic

The `renderStatic` function is used for server-side rendering to collect all HeadMaster data.

#### Returns

An object containing:
- `headMaster`: The collected HeadMaster data

#### Usage

```javascript
import { renderStatic } from 'preactheadmaster';

function serverRender() {
  // Render your app
  const appHtml = renderToString(<App />);

  // Collect HeadMaster data
  const { headMaster } = renderStatic();

  // Use headMaster data to generate full HTML document
  // ...
}
```

### generateFullDocument

The `generateFullDocument` function generates a complete HTML document string, including all HeadMaster data.

#### Parameters

- `headMaster`: The HeadMaster data object returned by `renderStatic`
- `body`: The rendered body content of your application

#### Returns

A string containing the full HTML document.

#### Usage

```javascript
import { renderToString } from 'preact-render-to-string';
import { renderStatic, generateFullDocument } from 'preactheadmaster';
import App from './App';

function serverRender() {
  const appHtml = renderToString(<App />);
  const { headMaster } = renderStatic();
  const fullDocument = generateFullDocument(headMaster, appHtml);
  return fullDocument;
}
```
