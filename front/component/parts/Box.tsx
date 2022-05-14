import React, { ReactChild } from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";
import TColor from "../types/color";

type Props = {
  bgColor?: TColor;
  radius?: number;
  paddingH?: number;
  paddingV?: number;
  children: ReactChild;
  marginH?: number;
  marginV?: number;
};

const Box: React.FC<Props> = ({
  paddingH = 1,
  paddingV = 3,
  marginH = 0,
  marginV = 0,
  radius = 1,
  children,
  bgColor = "white",
}) => {
  return (
    <>
      <BoxContainer
        paddingV={paddingV * 4}
        paddingH={paddingH * 4}
        marginV={marginV * 4}
        marginH={marginH * 4}
        radius={radius * 4}
        bgColor={bgColor}
      >
        {children}
      </BoxContainer>
    </>
  );
};

export default Box;

const BoxContainer = styled.div`
  display: inline-block;
  background-color: ${(props) => getColor(props.bgColor)};
  padding-left: ${(props) => props.paddingV}px;
  padding-right: ${(props) => props.paddingV}px;
  padding-top: ${(props) => props.paddingH}px;
  padding-bottom: ${(props) => props.paddingH}px;
  border-radius: ${(props) => props.radius}px;
  margin-left: ${(props) => props.marginV}px;
  margin-right: ${(props) => props.marginV}px;
  margin-top: ${(props) => props.marginH}px;
  margin-bottom: ${(props) => props.marginH}px;
  border-radius: ${(props) => props.radius}px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
`;
