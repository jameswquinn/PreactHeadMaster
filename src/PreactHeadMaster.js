import { createContext, h } from 'preact';
import { useContext, useEffect, useState, useCallback } from 'preact/hooks';

// Create a context for our HeadMaster data
const HeadMasterContext = createContext();

// Supported tag types
const VALID_TAG_NAMES = ['title', 'base', 'meta', 'link', 'style', 'script', 'noscript'];

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
            updatedData[tagName] = [...(prevData[tagName] || []), ...newData[tagName]];
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

  useEffect(() => {
    if (typeof document !== 'undefined') {
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
    }
  }, [headMasterData]);

  return (
    <HeadMasterContext.Provider value={{ headMasterData, updateHeadMasterData }}>
      {children}
    </HeadMasterContext.Provider>
  );
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

// Custom hooks for specific head elements
export function useTitle(title) {
  const { updateHeadMasterData } = useHeadMaster();
  useEffect(() => {
    updateHeadMasterData({ title });
  }, [title, updateHeadMasterData]);
}

export function useMeta(metaTags) {
  const { updateHeadMasterData } = useHeadMaster();
  useEffect(() => {
    updateHeadMasterData({ meta: metaTags });
  }, [metaTags, updateHeadMasterData]);
}

export function useLink(linkTags) {
  const { updateHeadMasterData } = useHeadMaster();
  useEffect(() => {
    updateHeadMasterData({ link: linkTags });
  }, [linkTags, updateHeadMasterData]);
}

export function useScript(scriptTags) {
  const { updateHeadMasterData } = useHeadMaster();
  useEffect(() => {
    updateHeadMasterData({ script: scriptTags });
  }, [scriptTags, updateHeadMasterData]);
}

export function useHtmlAttributes(attributes) {
  const { updateHeadMasterData } = useHeadMaster();
  useEffect(() => {
    updateHeadMasterData({ htmlAttributes: attributes });
  }, [attributes, updateHeadMasterData]);
}

export function useBodyAttributes(attributes) {
  const { updateHeadMasterData } = useHeadMaster();
  useEffect(() => {
    updateHeadMasterData({ bodyAttributes: attributes });
  }, [attributes, updateHeadMasterData]);
}

// Server-side rendering function
export function renderStatic() {
  if (typeof document === 'undefined') {
    return {
      headMaster: {
        title: '',
        base: [],
        meta: [],
        link: [],
        style: [],
        script: [],
        noscript: [],
        htmlAttributes: {},
        bodyAttributes: {},
      }
    };
  }

  const collectTags = (tagName) => {
    return Array.from(document.head.querySelectorAll(`${tagName}[data-headmaster]`))
      .map(tag => {
        const attrs = {};
        Array.from(tag.attributes).forEach(attr => {
          if (attr.name !== 'data-headmaster') {
            attrs[attr.name] = attr.value;
          }
        });
        if (tag.innerHTML) {
          attrs.innerHTML = tag.innerHTML;
        }
        return attrs;
      });
  };

  const headMaster = {
    title: document.title,
    base: collectTags('base'),
    meta: collectTags('meta'),
    link: collectTags('link'),
    style: collectTags('style'),
    script: collectTags('script'),
    noscript: collectTags('noscript'),
    htmlAttributes: {},
    bodyAttributes: {},
  };

  Array.from(document.documentElement.attributes).forEach(attr => {
    headMaster.htmlAttributes[attr.name] = attr.value;
  });
  Array.from(document.body.attributes).forEach(attr => {
    headMaster.bodyAttributes[attr.name] = attr.value;
  });

  return { headMaster };
}

// Utility function to generate a full HTML document
export function generateFullDocument(headMaster, body) {
  const htmlAttrs = Object.entries(headMaster.htmlAttributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const bodyAttrs = Object.entries(headMaster.bodyAttributes)
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
  <body ${bodyAttrs}>
    ${body}
  </body>
</html>
  `.trim();
}
