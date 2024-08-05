import { createContext, h } from 'preact';
import { useContext, useEffect, useState, useCallback, useMemo } from 'preact/hooks';

// Create a context for our HeadMaster data
const HeadMasterContext = createContext();

// Supported tag types
const VALID_TAG_NAMES = ['title', 'base', 'meta', 'link', 'style', 'script', 'noscript'];

// Error logging function
const logError = (message) => {
  console.error(`[PreactHeadMaster Error]: ${message}`);
};

// HeadMasterProvider component
export function HeadMasterProvider({ children }) {
  const [headMasterData, setHeadMasterData] = useState({
    title: '',
    base: [],
    meta: [],
    link: [],
    style: [],
    script: [],
    noscript: [],
    htmlAttributes: {},
    bodyAttributes: {},
  });

  const updateHeadMasterData = useCallback((newData) => {
    setHeadMasterData((prevData) => {
      const updatedData = { ...prevData };
      VALID_TAG_NAMES.forEach(tagName => {
        if (newData[tagName]) {
          if (tagName === 'title') {
            updatedData.title = newData.title;
          } else {
            // Implement priority system
            updatedData[tagName] = mergeTags(prevData[tagName], newData[tagName]);
          }
        }
      });
      if (newData.htmlAttributes) {
        updatedData.htmlAttributes = { ...prevData.htmlAttributes, ...newData.htmlAttributes };
      }
      if (newData.bodyAttributes) {
        updatedData.bodyAttributes = { ...prevData.bodyAttributes, ...newData.bodyAttributes };
      }
      return updatedData;
    });
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ headMasterData, updateHeadMasterData }), [headMasterData, updateHeadMasterData]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      try {
        document.title = headMasterData.title;

        const updateTags = (tagName, tags) => {
          const head = document.head;
          const oldTags = head.querySelectorAll(`${tagName}[data-headmaster]`);
          oldTags.forEach(tag => tag.remove());

          tags.forEach(tagData => {
            const newTag = document.createElement(tagName);
            Object.keys(tagData).forEach(attr => {
              if (attr !== 'innerHTML') {
                newTag.setAttribute(attr, tagData[attr]);
              }
            });
            if (tagData.innerHTML) {
              newTag.innerHTML = tagData.innerHTML;
            }
            newTag.setAttribute('data-headmaster', '');
            head.appendChild(newTag);
          });
        };

        VALID_TAG_NAMES.forEach(tagName => {
          if (tagName !== 'title') {
            updateTags(tagName, headMasterData[tagName]);
          }
        });

        const updateAttributes = (target, attributes) => {
          Object.keys(attributes).forEach(attr => {
            document[target].setAttribute(attr, attributes[attr]);
          });
        };

        updateAttributes('documentElement', headMasterData.htmlAttributes);
        updateAttributes('body', headMasterData.bodyAttributes);
      } catch (error) {
        logError(`Failed to update document head: ${error.message}`);
      }
    }
  }, [headMasterData]);

  return (
    <HeadMasterContext.Provider value={contextValue}>
      {children}
    </HeadMasterContext.Provider>
  );
}

// Priority system implementation
function mergeTags(existingTags, newTags) {
  const merged = [...existingTags];
  newTags.forEach(newTag => {
    const index = merged.findIndex(tag => tag.key === newTag.key);
    if (index !== -1) {
      merged[index] = { ...merged[index], ...newTag, priority: Math.max(merged[index].priority || 0, newTag.priority || 0) };
    } else {
      merged.push(newTag);
    }
  });
  return merged.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

// Custom hook to use HeadMaster
export function useHeadMaster() {
  const context = useContext(HeadMasterContext);
  if (!context) {
    throw new Error('useHeadMaster must be used within a HeadMasterProvider');
  }
  return context;
}

// HeadMaster component
export function HeadMaster(props) {
  const { updateHeadMasterData } = useHeadMaster();

  useEffect(() => {
    const headMasterData = {};
    VALID_TAG_NAMES.forEach(tagName => {
      if (props[tagName]) {
        headMasterData[tagName] = props[tagName];
      }
    });
    if (props.htmlAttributes) {
      headMasterData.htmlAttributes = props.htmlAttributes;
    }
    if (props.bodyAttributes) {
      headMasterData.bodyAttributes = props.bodyAttributes;
    }
    updateHeadMasterData(headMasterData);
  }, [props, updateHeadMasterData]);

  return null;
}

// Memoized hooks for performance optimization
export function useTitle(title) {
  const { updateHeadMasterData } = useHeadMaster();
  useEffect(() => {
    updateHeadMasterData({ title });
  }, [title, updateHeadMasterData]);
}

export function useMeta(metaTags) {
  const { updateHeadMasterData } = useHeadMaster();
  const memoizedMetaTags = useMemo(() => metaTags, [JSON.stringify(metaTags)]);
  useEffect(() => {
    updateHeadMasterData({ meta: memoizedMetaTags });
  }, [memoizedMetaTags, updateHeadMasterData]);
}

export function useLink(linkTags) {
  const { updateHeadMasterData } = useHeadMaster();
  const memoizedLinkTags = useMemo(() => linkTags, [JSON.stringify(linkTags)]);
  useEffect(() => {
    updateHeadMasterData({ link: memoizedLinkTags });
  }, [memoizedLinkTags, updateHeadMasterData]);
}

export function useScript(scriptTags) {
  const { updateHeadMasterData } = useHeadMaster();
  const memoizedScriptTags = useMemo(() => scriptTags, [JSON.stringify(scriptTags)]);
  useEffect(() => {
    updateHeadMasterData({ script: memoizedScriptTags });
  }, [memoizedScriptTags, updateHeadMasterData]);
}

export function useHtmlAttributes(attributes) {
  const { updateHeadMasterData } = useHeadMaster();
  const memoizedAttributes = useMemo(() => attributes, [JSON.stringify(attributes)]);
  useEffect(() => {
    updateHeadMasterData({ htmlAttributes: memoizedAttributes });
  }, [memoizedAttributes, updateHeadMasterData]);
}

export function useBodyAttributes(attributes) {
  const { updateHeadMasterData } = useHeadMaster();
  const memoizedAttributes = useMemo(() => attributes, [JSON.stringify(attributes)]);
  useEffect(() => {
    updateHeadMasterData({ bodyAttributes: memoizedAttributes });
  }, [memoizedAttributes, updateHeadMasterData]);
}

// Enhanced server-side rendering function with streaming support
export async function* renderStaticStream(App) {
  const chunks = [];
  let resolveStream;
  const streamPromise = new Promise(resolve => { resolveStream = resolve; });

  const headMasterData = {
    title: '',
    base: [],
    meta: [],
    link: [],
    style: [],
    script: [],
    noscript: [],
    htmlAttributes: {},
    bodyAttributes: {},
  };

  function captureHeadMaster(data) {
    Object.keys(data).forEach(key => {
      if (Array.isArray(headMasterData[key])) {
        headMasterData[key] = [...headMasterData[key], ...data[key]];
      } else if (typeof headMasterData[key] === 'object') {
        headMasterData[key] = { ...headMasterData[key], ...data[key] };
      } else {
        headMasterData[key] = data[key];
      }
    });
  }

  const streamingRenderToString = (element) => {
    // Implement a streaming version of renderToString
    // This is a placeholder and would need a proper implementation
    chunks.push(element);
    if (chunks.length === 1) {
      resolveStream();
    }
  };

  streamingRenderToString(<HeadMasterProvider><App captureHeadMaster={captureHeadMaster} /></HeadMasterProvider>);

  await streamPromise;

  yield generatePartialDocument(headMasterData, 'head');

  for (const chunk of chunks) {
    yield chunk;
  }

  yield generatePartialDocument(headMasterData, 'foot');
}

function generatePartialDocument(headMaster, part) {
  if (part === 'head') {
    const htmlAttrs = Object.entries(headMaster.htmlAttributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    const headContent = [
      headMaster.title ? `<title>${headMaster.title}</title>` : '',
      ...headMaster.base.map(attrs => `<base ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}>`),
      ...headMaster.meta.map(attrs => `<meta ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}>`),
      ...headMaster.link.map(attrs => `<link ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}>`),
      ...headMaster.style.map(attrs => `<style ${Object.entries(attrs).filter(([k]) => k !== 'innerHTML').map(([k, v]) => `${k}="${v}"`).join(' ')}>${attrs.innerHTML || ''}</style>`),
      ...headMaster.script.map(attrs => `<script ${Object.entries(attrs).filter(([k]) => k !== 'innerHTML').map(([k, v]) => `${k}="${v}"`).join(' ')}>${attrs.innerHTML || ''}</script>`),
      ...headMaster.noscript.map(attrs => `<noscript ${Object.entries(attrs).filter(([k]) => k !== 'innerHTML').map(([k, v]) => `${k}="${v}"`).join(' ')}>${attrs.innerHTML || ''}</noscript>`),
    ].join('\n');

    return `
<!DOCTYPE html>
<html ${htmlAttrs}>
  <head>
    ${headContent}
  </head>
  <body ${Object.entries(headMaster.bodyAttributes).map(([k, v]) => `${k}="${v}"`).join(' ')}>
    `;
  } else if (part === 'foot') {
    return `
  </body>
</html>
    `;
  }
}
