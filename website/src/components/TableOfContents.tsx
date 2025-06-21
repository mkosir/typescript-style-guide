import type { TOCItem } from '@docusaurus/mdx-loader';
// eslint-disable-next-line import-x/no-unresolved
import TOCInline from '@theme/TOCInline';
import { useState } from 'react';

type TableOfContentsProps = {
  items: ReadonlyArray<TOCItem>;
};

export const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [isTocExpanded, setIsTocExpanded] = useState(false);

  return (
    <nav aria-label="Table of contents" className="toc-inline -mt-2">
      <button
        aria-controls="toc-content"
        aria-expanded={isTocExpanded}
        className="cursor-pointer rounded-md border-none bg-gray-300 px-2 py-0.5 text-[11px] text-black transition-colors duration-100 hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
        title={`${isTocExpanded ? 'Collapse' : 'Expand'} Table of Contents`}
        onClick={() => setIsTocExpanded((prev) => !prev)}
      >
        {isTocExpanded ? 'Collapse' : 'Expand'}
      </button>
      <div id="toc-content">
        <TOCInline maxHeadingLevel={isTocExpanded ? 3 : 2} minHeadingLevel={2} toc={items} />
      </div>
    </nav>
  );
};
