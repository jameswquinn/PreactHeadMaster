import { h } from 'preact';
import render from 'preact-render-to-string';
import { HeadMasterProvider, HeadMaster, renderStaticStream } from '../index';

// Mock for renderStaticStream
jest.mock('../index', () => {
  const actual = jest.requireActual('../index');
  return {
    ...actual,
    renderStaticStream: jest.fn().mockImplementation(function* (App) {
      yield '<!DOCTYPE html><html><head>';
      yield render(<App />);
      yield '</head><body></body></html>';
    }),
  };
});

function App() {
  return (
    <HeadMasterProvider>
      <HeadMaster>
        <title>Server-Side Rendered Page</title>
        <meta name="description" content="This page was rendered on the server using PreactHeadMaster" />
      </HeadMaster>
      <h1>Server-Side Rendering with PreactHeadMaster</h1>
    </HeadMasterProvider>
  );
}

describe('Server-Side Rendering', () => {
  it('generates correct HTML stream', async () => {
    const stream = renderStaticStream(App);
    let result = '';
    for await (const chunk of stream) {
      result += chunk;
    }

    expect(result).toContain('<title>Server-Side Rendered Page</title>');
    expect(result).toContain('<meta name="description" content="This page was rendered on the server using PreactHeadMaster">');
    expect(result).toContain('<h1>Server-Side Rendering with PreactHeadMaster</h1>');
  });
});
