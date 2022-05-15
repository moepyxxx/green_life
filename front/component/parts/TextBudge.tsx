import React, { ReactChild } from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";
import TColor from "../types/color";

type Props = {
  color?: TColor;
  bgColor?: TColor;
  children: ReactChild;
};

const TextBudge: React.FC<Props> = ({
  color = "white",
  children,
  bgColor = "primary",
}) => {
  return (
    <>
      <Budge color={color} bgColor={bgColor}>
        {children}
      </Budge>
    </>
  );
};

export default TextBudge;

const Budge = styled.span`
  color: ${(props) => getColor(props.color)};
  background-color: ${(props) => getColor(props.bgColor)};
  font-size: 1.2rem;
  font-family: "Inter", sans-serif;
  line-height: 1;
  border-radius: 12px;
  padding: 4px 12px;
`;
