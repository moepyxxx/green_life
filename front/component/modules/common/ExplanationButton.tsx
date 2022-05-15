import React from "react";
import styled from "styled-components";
import getColor from "../../../utility/getColor";
import getShadow from "../../../utility/getShadow";

type Props = {
  click: () => void;
};
const ExplanationButton: React.FC<Props> = ({ click }) => {
  return (
    <Button onClick={click}>
      <Icon />
    </Button>
  );
};

export default ExplanationButton;

const Button = styled.button`
  align-items: center;
  display: inline-block;
  background: none;
  border: none;
  padding: 0;
  margin: 0 8px;
  vertical-align: middle;
`;

const Icon = styled.span`
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${getColor("white")};
  vertical-align: middle;
  position: relative;
  box-shadow: ${getShadow()};
  &:after {
    content: "?";
    color: ${getColor("secondary")};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1;
    font-size: 1.6rem;
  }
`;
