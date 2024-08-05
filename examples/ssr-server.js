import { h } from 'preact';
import render from 'preact-render-to-string';
import { HeadMasterProvider, HeadMaster, renderStaticStream } from 'preactheadmaster';

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

async function handleRequest(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  for await (const chunk of renderStaticStream(App)) {
    res.write(chunk);
  }

  res.end();
}

// Use this with your server framework of choice (e.g., Express, Koa, etc.)
