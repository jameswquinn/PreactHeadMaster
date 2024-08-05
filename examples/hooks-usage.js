import { h, render } from 'preact';
import { HeadMasterProvider, useTitle, useMeta, useLink } from 'preactheadmaster';

function SEO({ title, description, canonicalUrl }) {
  useTitle(title);
  useMeta([{ name: 'description', content: description }]);
  useLink([{ rel: 'canonical', href: canonicalUrl }]);

  return null;
}

function App() {
  return (
    <HeadMasterProvider>
      <div>
        <SEO 
          title="Hooks Example" 
          description="This page demonstrates using PreactHeadMaster hooks"
          canonicalUrl="https://myawesomesite.com/hooks-example"
        />
        <h1>PreactHeadMaster Hooks Example</h1>
        <p>This page uses PreactHeadMaster hooks for head management.</p>
      </div>
    </HeadMasterProvider>
  );
}

render(<App />, document.body);
