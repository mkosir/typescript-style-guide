import React, { useState } from 'react';

import { TOCItem } from '@docusaurus/mdx-loader';
import TOCInline from '@theme/TOCInline';

export const TableOfContents = ({ items }: { items: ReadonlyArray<TOCItem> }) => {
  const [isTocExpanded, setIsTocExpanded] = useState(false);

  return (
    <div className="mb-4">
      <TOCInline toc={items} minHeadingLevel={2} maxHeadingLevel={isTocExpanded ? 3 : 2} />
      <button onClick={() => setIsTocExpanded((prev) => !prev)}>{`${
        isTocExpanded ? 'Collapse' : 'Expand'
      } - Table of Contents`}</button>
    </div>
  );
};
