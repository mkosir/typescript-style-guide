import TOCInline from '@theme/TOCInline';
import React from 'react';

import { TOCItem } from '@docusaurus/mdx-loader';

export const TableOfContents = ({ items }: { items: ReadonlyArray<TOCItem> }) => {
  return <TOCInline toc={items} minHeadingLevel={2} maxHeadingLevel={2} />;
};
