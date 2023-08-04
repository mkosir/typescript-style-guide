import React from "react";

import TOCInline from "@theme/TOCInline";

export const TableOfContents = ({ toc }: { toc: any }) => {
  return <TOCInline toc={toc} minHeadingLevel={2} maxHeadingLevel={3} />;
};
