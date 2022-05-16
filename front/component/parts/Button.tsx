import React, { ReactChild } from "react";
import styled from "styled-components";

import getColor from "../../utility/getColor";
import getShadow from "../../utility/getShadow";

import TColor from "../types/color";
import Typography from "../parts/Typography";
import TSize from "../types/size";

type Props = {
  size?: TSize;
  children: ReactChild;
  color?: TColor;
  bgColor?: TColor;
  borderColor?: TColor;
  margin?: string;
  click: () => void;
};
const Button: React.FC<Props> = ({
  size = "medium",
  bgColor = "primary",
  color = "white",
  borderColor = "primary",
  margin = "0",
  children,
  click,
}) => {
  return (
    <ButtonItem
      onClick={click}
      size={size}
      bgColor={bgColor}
      margin={margin}
      borderColor={borderColor}
    >
      <Typography size={size} weight="bold" color={color}>
        {children}
      </Typography>
    </ButtonItem>
  );
};

export default Button;

const ButtonItem = styled.button`
  border: 1px solid ${(prop) => getColor(prop.borderColor)};
  min-width: ${(prop) => (prop.size === "medium" ? "176px" : "112px")};
  border-radius: ${(prop) => (prop.size === "medium" ? "44px" : "28px")};
  padding: ${(prop) => (prop.size === "medium" ? "12px 24px" : "8px")};
  margin: ${(prop) => prop.margin};
  background-color: ${(prop) => getColor(prop.bgColor)};
  box-shadow: ${getShadow()};
`;
