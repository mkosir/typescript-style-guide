import { screen, render } from '@testing-library/react';

import { HomePage } from '.';

describe('apps', () => {
  describe('boilerplate-website', () => {
    describe('HomePage', () => {
      it('should render home page when no props are present', () => {
        render(<HomePage />);

        expect(screen.getByText('Home')).toBeInTheDocument();
      });
    });
  });
});
