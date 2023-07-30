// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/okaidia"); // dracula / nightOwl / okaidia / palenight / vsDark

/** @type {import('@docusaurus/types').Config} */
const config = {
  // title: "TypeScript Style Guide",
  title: " ",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  url: "https://mkosir.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/typescript-style-guide",

  // GitHub pages deployment config.
  organizationName: "mkosir",
  projectName: "typescript-style-guide",

  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "dark",
        respectPrefersColorScheme: false,
      },
      // Replace with your project's social card
      image: "img/typescript-card.png",
      navbar: {
        title: "TypeScript Style Guide",
        logo: {
          alt: "logo",
          src: "img/typescript-logo-40.png",
          height: 22,
          width: 22,
          style: { height: "auto", marginTop: 5 },
        },
        items: [
          {
            href: "https://github.com/mkosir/typescript-style-guide",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        // links: [
        //   {
        //     title: "More",
        //     items: [
        //       {
        //         label: "GitHub",
        //         href: "https://github.com/mkosir/typescript-style-guide",
        //       },
        //     ],
        //   },
        // ],
        copyright: `TypeScript Style Guide. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "YOUR_APP_ID",

        // Public API key: it is safe to commit it
        apiKey: "YOUR_SEARCH_API_KEY",

        indexName: "YOUR_INDEX_NAME",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: "/docs/", // or as RegExp: /\/docs\//
          to: "/",
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",
      },
    }),
};

module.exports = config;
