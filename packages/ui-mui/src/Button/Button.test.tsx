import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithTheme } from 'test-utils';

import { Button } from '.';

describe('packages', () => {
  describe('ui', () => {
    describe('Button', () => {
      it('should render button with text content when passed in props', () => {
        const onClick = jest.fn();
        const btnTextContent = 'Click Me';

        renderWithTheme(<Button text={btnTextContent} onClick={onClick} />);

        expect(screen.getByRole('button', { name: btnTextContent })).toBeInTheDocument();
        expect(onClick).not.toBeCalled();
      });

      it('should call onClick prop when clicked', async () => {
        const onClick = jest.fn();
        const btnTextContent = 'Click Me';

        renderWithTheme(<Button text={btnTextContent} onClick={onClick} />);

        const button = screen.getByRole('button', { name: btnTextContent });
        await userEvent.click(button);

        expect(onClick).toBeCalled();
      });
    });
  });
});
