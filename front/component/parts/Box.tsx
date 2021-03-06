import React, { ReactChild } from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";
import getShadow from "../../utility/getShadow";
import TColor from "../types/color";
import CloseButton from "./popup/CloseButton";

type Props = {
  bgColor?: TColor;
  radius?: number;
  paddingH?: number;
  paddingV?: number;
  children: ReactChild;
  marginH?: number;
  marginV?: number;
  width?: "auto" | "max";
  click?: () => void | null;
  isCloseButton?: boolean;
  closeButtonClick?: () => void;
};

const Box: React.FC<Props> = ({
  paddingH = 1,
  paddingV = 3,
  marginH = 0,
  marginV = 0,
  radius = 1,
  children,
  bgColor = "white",
  width = "max",
  click = null,
  isCloseButton = false,
  closeButtonClick,
}) => {
  const close = () => {
    if (isCloseButton && closeButtonClick) {
      return <CloseButton click={closeButtonClick} />;
    } else {
      return <></>;
    }
  };
  if (click) {
    return (
      <BoxContainer
        onClick={click}
        paddingV={paddingV * 4}
        paddingH={paddingH * 4}
        marginV={marginV * 4}
        marginH={marginH * 4}
        radius={radius * 4}
        bgColor={bgColor}
        width={width === "max" ? "100%" : "auto"}
      >
        {close()}
        {children}
      </BoxContainer>
    );
  } else {
    return (
      <BoxContainer
        paddingV={paddingV * 4}
        paddingH={paddingH * 4}
        marginV={marginV * 4}
        marginH={marginH * 4}
        radius={radius * 4}
        bgColor={bgColor}
        width={width === "max" ? "100%" : "auto"}
      >
        {close()}
        {children}
      </BoxContainer>
    );
  }
};

export default Box;

const BoxContainer = styled.div`
  position: relative;
  width: ${(props) => props.width};
  display: inline-block;
  background-color: ${(props) => getColor(props.bgColor)};
  padding-left: ${(props) => props.paddingV}px;
  padding-right: ${(props) => props.paddingV}px;
  padding-top: ${(props) => props.paddingH}px;
  padding-bottom: ${(props) => props.paddingH}px;
  margin-left: ${(props) => props.marginV}px;
  margin-right: ${(props) => props.marginV}px;
  margin-top: ${(props) => props.marginH}px;
  margin-bottom: ${(props) => props.marginH}px;
  border-radius: ${(props) => props.radius}px;
  box-shadow: ${getShadow()};
`;
