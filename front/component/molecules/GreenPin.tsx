import React from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";
import Tree from "../pattern/Tree";

type Props = {
  top: number;
  left: number;
  click: () => void | null;
  isActive?: boolean;
};
const GreenPin: React.FC<Props> = ({ click, top, left, isActive = false }) => {
  return click ? (
    <ButtonPin
      onClick={click}
      top={top.toString()}
      left={left.toString()}
      isActive={isActive}
    >
      <Tree />
    </ButtonPin>
  ) : (
    <SpanPin
      onClick={click}
      top={top.toString()}
      left={left.toString()}
      isActive={isActive}
    >
      <Tree />
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
  top: calc(${(props) => props.top}% - 52px);
  left: calc(${(props) => props.left}% - 52px);
  background-color: #fff;
  border: ${(props) =>
    props.isActive ? `${getColor("gray")} solid 4px` : "none"};

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SpanPin = ButtonPin.withComponent("span");
