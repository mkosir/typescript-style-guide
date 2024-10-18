import React from 'react';

export const GithubStats = () => {
  return (
    <div className="flex items-center gap-0.5">
      <iframe
        className="mr-10 md:mr-40 min-[997px]:mr-0" // Adjust because of swizzling - src/theme/NavbarItem/ComponentTypes.tsx
        height={20}
        src="https://ghbtns.com/github-btn.html?user=mkosir&amp;repo=typescript-style-guide&amp;type=star&amp;count=true&amp;size=small"
        width={100}
      />
      <iframe
        className="hidden min-[997px]:inline"
        height={20}
        src="https://ghbtns.com/github-btn.html?user=mkosir&amp;repo=typescript-style-guide&amp;type=fork&amp;count=true&amp;size=small"
        width={100}
      />
    </div>
  );
};
