/* eslint-disable @typescript-eslint/require-await */
import { themes } from 'prism-react-renderer';

import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';

const config: Config = {
  title: ' ',
  tagline: 'TypeScript Style Guide',
  favicon: 'img/favicon.ico',

  url: 'https://mkosir.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/typescript-style-guide',

  // GitHub pages deployment config.
  organizationName: 'mkosir',
  projectName: 'typescript-style-guide',

  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
      ,
    ],
  ],

  plugins: [
    async function myPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          postcssOptions.plugins.push(require('tailwindcss'));
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    image: 'img/typescript-card.png',
    navbar: {
      title: 'TypeScript Style Guide',
      logo: {
        alt: 'logo',
        src: 'img/typescript-logo-40.png',
        height: 22,
        width: 22,
        style: { height: 'auto', marginTop: 5 },
      },
      items: [
        {
          href: 'https://github.com/mkosir/typescript-style-guide',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `TypeScript Style Guide. Built with Docusaurus.`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.okaidia,
    },
    algolia: {
      // Public application ID provided by Algolia
      appId: '3CBFIG0U2G',
      // Public API key
      apiKey: 'c32aa1ae163b2d28ccd2fe42ee3b73be',
      indexName: 'typescript-style-guide',
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',
      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },
      // Optional: Algolia search parameters
      searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
};

// eslint-disable-next-line import/no-default-export
export default config;
