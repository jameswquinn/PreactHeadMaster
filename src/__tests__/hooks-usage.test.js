import { h } from 'preact';
import { render } from '@testing-library/preact';
import { HeadMasterProvider, useTitle, useMeta, useLink } from '../index';

function SEO({ title, description, canonicalUrl }) {
  useTitle(title);
  useMeta([{ name: 'description', content: description }]);
  useLink([{ rel: 'canonical', href: canonicalUrl }]);
  return null;
}

describe('Hooks Usage', () => {
  it('sets title, meta, and link tags using hooks', () => {
    render(
      <HeadMasterProvider>
        <SEO 
          title="Hooks Example" 
          description="This page demonstrates using PreactHeadMaster hooks"
          canonicalUrl="https://myawesomesite.com/hooks-example"
        />
      </HeadMasterProvider>
    );

    expect(document.title).toBe('Hooks Example');
    expect(document.querySelector('meta[name="description"]').content).toBe('This page demonstrates using PreactHeadMaster hooks');
    expect(document.querySelector('link[rel="canonical"]').href).toBe('https://myawesomesite.com/hooks-example');
  });
});
