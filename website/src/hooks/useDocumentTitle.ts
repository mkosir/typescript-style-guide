import { useEffect } from 'react';

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
    //@ts-expect-error revert the function
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(' ');

type UseDocumentTitleProps = {
  children: string;
};

export const UseDocumentTitle = ({ children }: UseDocumentTitleProps) => {
  useDocumentTitle(children);

  return null;
};
