import { h } from 'preact';
import { render, screen } from '@testing-library/preact';
import { HeadMaster } from './HeadMaster';

describe('HeadMaster', () => {
  it('renders title', () => {
    render(
      <HeadMaster>
        <title>Test Title</title>
      </HeadMaster>
    );
    
    expect(document.title).toBe('Test Title');
  });

  it('renders meta tags', () => {
    render(
      <HeadMaster>
        <meta name="description" content="Test description" />
      </HeadMaster>
    );
    
    const metaTag = document.querySelector('meta[name="description"]');
    expect(metaTag).toHaveAttribute('content', 'Test description');
  });
});
