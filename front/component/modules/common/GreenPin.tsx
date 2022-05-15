import React from "react";
import Image from "next/image";
import styled from "styled-components";
import getShadow from "../../../utility/getShadow";
import IconGreen from "../../../img/icon/green.svg";

type Props = {
  top: number;
  left: number;
  click: () => void | null;
};
const GreenPin: React.FC<Props> = ({ click, top, left }) => {
  return click ? (
    <ButtonPin onClick={click} top={top.toString()} left={left.toString()}>
      <Image src={IconGreen} alt="ピンアイコン" />
    </ButtonPin>
  ) : (
    <SpanPin onClick={click} top={top.toString()} left={left.toString()}>
      <Image src={IconGreen} alt="ピンアイコン" />
    </SpanPin>
  );
};

export default GreenPin;

const ButtonPin = styled.button`
  position: absolute;
  display: inline-block;
  z-index: 4;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: ${getShadow()};
  top: calc(${(props) => props.top}% - 52px);
  left: calc(${(props) => props.left}% - 52px);
  background-color: #fff;
  border: none;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SpanPin = ButtonPin.withComponent("span");
