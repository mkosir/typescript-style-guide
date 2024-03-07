import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';

import { GithubStats } from '@site/src/components';

// https://docusaurus.io/docs/swizzling

// Theming: use custom components as navbar/sidebar/footer items
// https://github.com/facebook/docusaurus/issues/7227

export default {
  ...ComponentTypes,
  'custom-GithubStats': GithubStats,
};