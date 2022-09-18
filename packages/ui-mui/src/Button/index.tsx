import { ButtonTypeMap } from '@mui/material';
import { CSSProperties } from 'react';

import { ButtonStyled } from './styled';

export type ButtonProps = {
  text: string;
  isDisabled?: boolean;
  size?: ButtonTypeMap['props']['size'];
  bgColor?: CSSProperties['backgroundColor'];
  onClick: () => void;
};

export const Button = ({ text, isDisabled, size, bgColor, onClick }: ButtonProps) => {
  return (
    <ButtonStyled
      variant="contained"
      disabled={isDisabled}
      isDisabled={isDisabled}
      size={size}
      bgColor={bgColor}
      onClick={onClick}
    >
      {text}
    </ButtonStyled>
  );
};
