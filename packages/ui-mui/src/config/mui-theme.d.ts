/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { PaletteColor, PaletteColorOptions } from '@mui/material';
import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface Theme {
    brand: {
      blue: CSSProperties['color'];
      green: CSSProperties['color'];
    };
  }

  interface ThemeOptions {
    brand: {
      blue: CSSProperties['color'];
      green: CSSProperties['color'];
    };
  }

  interface Palette {
    neutral: PaletteColor;
  }

  interface PaletteOptions {
    neutral: PaletteColorOptions;
  }
}
