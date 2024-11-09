import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset -  don't wipe out the rest of Docusaurus styles
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {},
  plugins: [],
};

// eslint-disable-next-line import/no-default-export
export default tailwindConfig;
