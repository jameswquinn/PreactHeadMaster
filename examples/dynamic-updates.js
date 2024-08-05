import { h, render } from 'preact';
import { useState } from 'preact/hooks';
import { HeadMasterProvider, useTitle, useMeta } from 'preactheadmaster';

function DynamicHead() {
  const [count, setCount] = useState(0);
  
  useTitle(`You clicked ${count} times`);
  useMeta([{ name: 'description', content: `This page has been updated ${count} times` }]);

  return (
    <div>
      <h1>Dynamic Head Updates</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

function App() {
  return (
    <HeadMasterProvider>
      <DynamicHead />
    </HeadMasterProvider>
  );
}

render(<App />, document.body);
