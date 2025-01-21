const IFRAME_ATTRS = {
  height: 20,
  width: 100,
} as const;

const getSrcUrl = (type: 'star' | 'fork') =>
  `https://ghbtns.com/github-btn.html?user=mkosir&repo=typescript-style-guide&type=${type}&count=true&size=small` as const;

export const GithubStats = () => {
  return (
    <div className="flex items-center gap-0.5">
      <iframe {...IFRAME_ATTRS} className="mr-10 md:mr-40 min-[997px]:mr-0" src={getSrcUrl('star')} />
      <iframe {...IFRAME_ATTRS} className="hidden min-[997px]:inline" src={getSrcUrl('fork')} />
    </div>
  );
};
