import path from 'path';

import { StorybookConfig } from '@storybook/core-common';

const storybookConfig: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  typescript: { reactDocgen: 'react-docgen' },
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    // Resolve absolute imports
    config.resolve?.modules?.push(path.resolve(process.cwd(), 'src'));

    return config;
  },
};

module.exports = storybookConfig;
