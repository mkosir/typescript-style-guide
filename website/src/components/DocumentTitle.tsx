import { useEffect } from "react";

type DocumentTitleProps = {
  title: string;
};

export const DocumentTitle = ({ title }: DocumentTitleProps) => {
  useEffect(() => {
    const handlePopstate = () => {
      const hash = window.location.hash;

      if (!hash) {
        document.title = title;
        return;
      }

      document.title = `${formatHash(hash)} | ${title}`;
    };

    document.title = title;

    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return null;
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
