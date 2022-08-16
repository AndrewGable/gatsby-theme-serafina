import React from "react";
import { Heading } from "theme-ui";
import useName from "../hooks/use-name";

const Logo = () => {
  const name = useName();

  return <Heading sx={{
    width: "100%",
    textAlign: "center", fontSize: [3, 3, 6, 6]
  }}>
    {name}
  </Heading>;
};

export default Logo;
