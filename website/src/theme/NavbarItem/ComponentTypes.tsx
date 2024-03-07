import { GithubStats } from '@site/src/components';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';

// https://docusaurus.io/docs/swizzling

// Theming: use custom components as navbar/sidebar/footer items
// https://github.com/facebook/docusaurus/issues/7227

// eslint-disable-next-line import/no-default-export
export default {
  ...ComponentTypes,
  'custom-GithubStats': GithubStats,
};
