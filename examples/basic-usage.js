import { h, render } from 'preact';
import { HeadMasterProvider, HeadMaster } from 'preactheadmaster';

function App() {
  return (
    <HeadMasterProvider>
      <div>
        <HeadMaster>
          <title>My Awesome Page</title>
          <meta name="description" content="This is an awesome page using PreactHeadMaster" />
          <link rel="canonical" href="https://myawesomesite.com" />
        </HeadMaster>
        <h1>Welcome to My Awesome Page</h1>
        <p>This page is using PreactHeadMaster for head management.</p>
      </div>
    </HeadMasterProvider>
  );
}

render(<App />, document.body);
