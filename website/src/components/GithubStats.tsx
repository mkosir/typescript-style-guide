import React from 'react';

export const GithubStats = () => {
  return (
    <div className="mt-5">
      <iframe
        src="https://ghbtns.com/github-btn.html?user=mkosir&amp;repo=typescript-style-guide&amp;type=star&amp;count=true&amp;size=small"
        width={100}
        height={20}
      />
      <iframe
        src="https://ghbtns.com/github-btn.html?user=mkosir&amp;repo=typescript-style-guide&amp;type=fork&amp;count=true&amp;size=small"
        width={100}
        height={20}
      />
    </div>
  );
};
