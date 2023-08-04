import { useEffect } from "react";

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

    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
};

const formatHash = (hash: string) => {
  const hashParsed = hash.substring(1).replace(/--/g, " & ").replace(/-/g, " ");
  const hashFormatted = toUpperEachWord(hashParsed);
  return hashFormatted;
};

const toUpperEachWord = (text: string) =>
  text
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");

type UseDocumentTitleProps = {
  children: string;
};

export const UseDocumentTitle = ({ children }: UseDocumentTitleProps) => {
  useDocumentTitle(children);

  return null;
};
