import React, { ReactChild } from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";
import TColor from "../types/color";
import Typography from "../atoms/Typography";

type Props = {
  children: ReactChild;
  color?: TColor;
  bgColor?: TColor;
  borderColor?: TColor;
  margin?: string;
  column?: 1 | 2;
  click: () => void;
};
const RadiusButton: React.FC<Props> = ({
  column = 1,
  bgColor = "secondary",
  color = "white",
  borderColor = "white",
  margin = "0",
  children,
  click,
}) => {
  return (
    <Button
      onClick={click}
      bgColor={bgColor}
      margin={margin}
      borderColor={borderColor}
      column={column}
    >
      <Typography size="regular" weight="bold" color={color}>
        {children}
      </Typography>
    </Button>
  );
};

export default RadiusButton;

const Button = styled.button`
  border: 1px solid ${(prop) => getColor(prop.borderColor)};
  min-width: ${(prop) => (prop.column === 1 ? "172px" : "112px")};
  border-radius: 20px;
  padding: 8px;
  margin: ${(prop) => prop.margin};
  background-color: ${(prop) => getColor(prop.bgColor)};
`;
