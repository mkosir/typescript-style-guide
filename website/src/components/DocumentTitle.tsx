import { useEffect } from "react";

export const DocumentTitle = () => {
  const title = "TypeScript Style Guide";

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) {
      document.title = title;
      return;
    }

    document.title = `${formatHash(hash)} | ${title}`;
  }, [window.location.href]);

  return null;
};

const formatHash = (hash: string) => {
  const removeHash = hash.substring(1);
  const hashRemoveDoubleHyphen = removeHash.replace(/--/g, " & ");
  const hashParsed = hashRemoveDoubleHyphen.replace(/-/g, " ");
  const hashFormatted = toUpperEachWord(hashParsed);

  return hashFormatted;
};

const toUpperEachWord = (text: string) =>
  text
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
