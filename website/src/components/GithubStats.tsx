import React from 'react';


const DOCUSAURUS_LG_BREAKPOINT = 997;

export const GithubStats = () => {
  return (
    <div className="flex items-center gap-0.5">
      <iframe
        src="https://ghbtns.com/github-btn.html?user=mkosir&amp;repo=typescript-style-guide&amp;type=star&amp;count=true&amp;size=small"
        width={100}
        height={20}
        className={`mr-10 md:mr-40 min-[${DOCUSAURUS_LG_BREAKPOINT}px]:mr-0`} // Adjust because of swizzling - src/theme/NavbarItem/ComponentTypes.tsx
      />
      <iframe
        src="https://ghbtns.com/github-btn.html?user=mkosir&amp;repo=typescript-style-guide&amp;type=fork&amp;count=true&amp;size=small"
        width={100}
        height={20}
        className={`hidden min-[${DOCUSAURUS_LG_BREAKPOINT}px]:inline`}
      />
    </div>
  );
};
