import React from 'react';
import Tilt from 'react-parallax-tilt';

import { useColorMode } from '@docusaurus/theme-common';

type MainTitleProps = {
  children: string;
};

export const MainTitle = ({ children }: MainTitleProps) => {
  const { colorMode } = useColorMode();

  return (
    <div className="mb-7 flex justify-center">
      <Tilt
        tiltAxis="y"
        tiltMaxAngleY={5}
        transitionSpeed={2500}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glareColor={colorMode === 'dark' ? '#007cfe' : '#498cd5'}
        glarePosition="all"
        glareBorderRadius="9px"
      >
        <div className="text-center">
          <div className="flex items-center gap-1.5">
            <img src="https://raw.githubusercontent.com/mkosir/typescript-style-guide/main/misc/typescript-logo-30.png" />{' '}
            <h1>{children}</h1>
          </div>
          <div className="mt-1">
            <iframe
              src="https://ghbtns.com/github-btn.html?user=mkosir&amp;repo=typescript-style-guide&amp;type=star&amp;count=true&amp;size=small"
              width={100}
              height={20}
            />
          </div>
        </div>
      </Tilt>
    </div>
  );
};
