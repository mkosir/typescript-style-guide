import { useColorMode } from '@docusaurus/theme-common';
import Tilt from 'react-parallax-tilt';

type MainTitleProps = {
  children: string;
};

export const MainTitle = ({ children }: MainTitleProps) => {
  const { colorMode } = useColorMode();

  return (
    <div className="mb-7 flex justify-center">
      <Tilt
        glareBorderRadius="9px"
        glareColor={colorMode === 'dark' ? '#007cfe' : '#498cd5'}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glarePosition="all"
        tiltAxis="y"
        tiltMaxAngleY={5}
        transitionSpeed={2500}
      >
        <div className="flex items-center gap-2">
          <img
            alt="TypeScript Logo"
            src="https://raw.githubusercontent.com/mkosir/typescript-style-guide/main/misc/typescript-logo-30.png"
          />
          <h1>{children}</h1>
        </div>
      </Tilt>
    </div>
  );
};
