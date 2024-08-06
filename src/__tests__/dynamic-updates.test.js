import { h } from 'preact';
import { render, fireEvent } from '@testing-library/preact';
import { useState } from 'preact/hooks';
import { HeadMasterProvider, useTitle, useMeta } from '../index';

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

describe('Dynamic Head Updates', () => {
  it('updates title and meta tags dynamically', async () => {
    const { getByText } = render(
      <HeadMasterProvider>
        <DynamicHead />
      </HeadMasterProvider>
    );

    expect(document.title).toBe('You clicked 0 times');
    expect(document.querySelector('meta[name="description"]').content).toBe('This page has been updated 0 times');

    const button = getByText('Click me');
    fireEvent.click(button);

    expect(document.title).toBe('You clicked 1 times');
    expect(document.querySelector('meta[name="description"]').content).toBe('This page has been updated 1 times');
  });
});
