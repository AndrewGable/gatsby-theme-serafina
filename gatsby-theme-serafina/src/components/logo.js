import React from "react";
import { Heading } from "theme-ui";
import useName from "../hooks/use-name";

const Logo = () => {
  const name = useName();

  return <Heading sx={{fontSize: 5}}>{name}</Heading>;
};

export default Logo;
