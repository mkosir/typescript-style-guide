import { TOCItem } from '@docusaurus/mdx-loader';
import TOCInline from '@theme/TOCInline';
import React from 'react';

export const TableOfContents = ({ items }: { items: ReadonlyArray<TOCItem> }) => {
  return <TOCInline toc={items} minHeadingLevel={2} maxHeadingLevel={2} />;
};
