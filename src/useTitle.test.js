import { h } from 'preact';
import { renderHook } from '@testing-library/preact-hooks';
import { useTitle } from './useTitle';

describe('useTitle', () => {
  it('sets document title', () => {
    renderHook(() => useTitle('New Title'));
    expect(document.title).toBe('New Title');
  });

  it('updates document title when title changes', () => {
    const { rerender } = renderHook((props) => useTitle(props.title), {
      initialProps: { title: 'Initial Title' },
    });

    expect(document.title).toBe('Initial Title');

    rerender({ title: 'Updated Title' });
    expect(document.title).toBe('Updated Title');
  });
});
