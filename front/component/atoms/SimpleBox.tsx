import React, { ReactChild } from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";
import TColor from "../types/color";

type Props = {
  children: ReactChild;
  color?: TColor;
};

const SimpleBox: React.FC<Props> = ({ children, color = "disable" }) => {
  return <Box color={color}>{children}</Box>;
};

export default SimpleBox;

const Box = styled.div`
  border-radius: 4px;
  padding: 20px;
  background-color: ${(prop) => getColor(prop.color)};
`;
