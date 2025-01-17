import type { TOCItem } from '@docusaurus/mdx-loader';
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
        className="rounded-md border-none px-2 py-1 text-[11px] hover:cursor-pointer"
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
