import React, { useState } from 'react';

import { TOCItem } from '@docusaurus/mdx-loader';
import TOCInline from '@theme/TOCInline';

export const TableOfContents = ({ items }: { items: ReadonlyArray<TOCItem> }) => {
  const [isTocExpanded, setIsTocExpanded] = useState(false);

  return (
    <div className="toc-inline mb-4">
      <TOCInline toc={items} minHeadingLevel={2} maxHeadingLevel={isTocExpanded ? 3 : 2} />
      <button
        className="text-[11px] hover:cursor-pointer"
        onClick={() => setIsTocExpanded((prev) => !prev)}
        title={`${isTocExpanded ? 'Collapse' : 'Expand'} - Table of Contents`}
      >{`${isTocExpanded ? 'Collapse' : 'Expand'} - TOC`}</button>
    </div>
  );
};
