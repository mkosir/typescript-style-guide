import { cn } from '../utils/cn';

const IFRAME_ATTRS = {
  height: 20,
  width: 100,
} as const;

const GITHUB_STAR_BUTTON_MARGIN_MOBILE = 'mr-10';
const GITHUB_STAR_BUTTON_MARGIN_DESKTOP = 'md:mr-40';

const getSrcUrl = (type: 'star' | 'fork') =>
  `https://ghbtns.com/github-btn.html?user=mkosir&repo=typescript-style-guide&type=${type}&count=true&size=small` as const;

export const GithubStats = () => {
  return (
    <div className="flex items-center gap-0.5">
      <iframe
        {...IFRAME_ATTRS}
        className={cn(GITHUB_STAR_BUTTON_MARGIN_MOBILE, GITHUB_STAR_BUTTON_MARGIN_DESKTOP, `min-[997px]:mr-0!`)}
        src={getSrcUrl('star')}
        title="GitHub Stars"
      />
      <iframe {...IFRAME_ATTRS} className={`hidden min-[997px]:inline`} src={getSrcUrl('fork')} title="GitHub Forks" />
    </div>
  );
};
