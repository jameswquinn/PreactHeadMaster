import { h, hydrate } from 'preact';
import { HeadMasterProvider, HeadMaster } from 'preactheadmaster';

function App() {
  return (
    <HeadMasterProvider>
      <div>
        <HeadMaster>
          <title>Server-Side Rendered Page</title>
          <meta name="description" content="This page was rendered on the server using PreactHeadMaster" />
        </HeadMaster>
        <h1>Server-Side Rendering with PreactHeadMaster</h1>
        <p>This content was rendered on the server.</p>
      </div>
    </HeadMasterProvider>
  );
}

hydrate(<App />, document.body);
