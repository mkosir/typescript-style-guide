import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { Story } from '@storybook/react';

import { theme } from '../src/config';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withTheme = (Story: Story) => (
  <MUIThemeProvider theme={theme}>
    <Story />
  </MUIThemeProvider>
);

export const decorators = [withTheme];
