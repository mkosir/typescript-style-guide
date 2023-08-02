import React, { ReactNode } from "react";
import Tilt from "react-parallax-tilt";

type MainTitleProps = {
  children: ReactNode;
};

export const MainTitle = ({ children }: MainTitleProps) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Tilt tiltMaxAngleX={8} tiltMaxAngleY={5} transitionSpeed={2500}>
        <div
          style={{ display: "flex", alignItems: "center", columnGap: "6px" }}
        >
          <img src="https://raw.githubusercontent.com/mkosir/typescript-style-guide/main/misc/typescript-logo-30.png" />{" "}
          <h1 style={{ marginBottom: 0 }}>{children}</h1>
        </div>
      </Tilt>
    </div>
  );
};
