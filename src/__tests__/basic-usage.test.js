import { h } from 'preact';
import { render } from '@testing-library/preact';
import { HeadMasterProvider, HeadMaster } from '../index';

describe('Basic Usage', () => {
  it('renders title and meta tags', () => {
    render(
      <HeadMasterProvider>
        <HeadMaster>
          <title>My Awesome Page</title>
          <meta name="description" content="This is an awesome page using PreactHeadMaster" />
          <link rel="canonical" href="https://myawesomesite.com" />
        </HeadMaster>
        <h1>Welcome to My Awesome Page</h1>
      </HeadMasterProvider>
    );

    expect(document.title).toBe('My Awesome Page');
    expect(document.querySelector('meta[name="description"]').content).toBe('This is an awesome page using PreactHeadMaster');
    expect(document.querySelector('link[rel="canonical"]').href).toBe('https://myawesomesite.com/');
  });
});
