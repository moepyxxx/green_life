import React, { ReactChild } from "react";
import styled from "styled-components";
import Typography from "../atoms/Typography";
import TColor from "../types/color";
import TSize from "../types/size";

type Props = {
  size?: TSize;
  click: () => void;
  children: ReactChild;
  color?: TColor;
};
const UnderLineTextButton: React.FC<Props> = ({
  color = "secondary",
  size = "regular",
  click,
  children,
}) => {
  return (
    <Button click={click}>
      <Typography tag="span" size={size} color={color} underline={true}>
        {children}
      </Typography>
    </Button>
  );
};

export default UnderLineTextButton;

const Button = styled.button`
  border: none;
  display: inline;
`;
