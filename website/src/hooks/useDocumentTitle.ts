import { useEffect } from 'react';

/**
 * Update the document title dynamically based on hash and title.
 */
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const handlePopstate = () => {
      const hash = window.location.hash;

      if (!hash) {
        document.title = title;
        return;
      }

      document.title = `${formatHash(hash)} | ${title}`;
    };

    handlePopstate();

    window.addEventListener('popstate', handlePopstate);
    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [title]);
};

const formatHash = (hash: string) => {
  const hashParsed = hash
    .substring(1)
    .replace(/---/g, '__dash__')
    .replace(/--/g, ' & ')
    .replace(/-/g, ' ')
    .replace(/__dash__/g, ' - ');

  const hashFormatted = toUpperEachWord(hashParsed);
  return hashFormatted;
};

const toUpperEachWord = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .map((word) => word[0]?.toUpperCase() + word.substring(1))
    .join(' ');

type UseDocumentTitleProps = {
  children: string;
};

/**
 * Wrapper component, since MDX file can't use hook directly.
 */
export const UseDocumentTitle = ({ children }: UseDocumentTitleProps) => {
  useDocumentTitle(children);

  return null;
};
