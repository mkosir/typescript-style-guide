import React from "react";

import TOCInline from "@theme/TOCInline";

export const TableOfContents = ({ items }: { items: any }) => {
  return <TOCInline toc={items} minHeadingLevel={2} maxHeadingLevel={3} />;
};
