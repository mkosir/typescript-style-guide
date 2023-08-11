import React, { useState } from 'react';

import { TOCItem } from '@docusaurus/mdx-loader';
import TOCInline from '@theme/TOCInline';

export const TableOfContents = ({ items }: { items: ReadonlyArray<TOCItem> }) => {
  const [isTocExpanded, setIsTocExpanded] = useState(false);

  return (
    <div className="toc-inline -mt-2">
      <button
        className="rounded-md border-none px-2 py-1 text-[11px] hover:cursor-pointer"
        onClick={() => setIsTocExpanded((prev) => !prev)}
        title={`${isTocExpanded ? 'Collapse' : 'Expand'} - Table of Contents`}
      >
        {isTocExpanded ? 'Collapse' : 'Expand'}
      </button>
      <TOCInline toc={items} minHeadingLevel={2} maxHeadingLevel={isTocExpanded ? 3 : 2} />
    </div>
  );
};
