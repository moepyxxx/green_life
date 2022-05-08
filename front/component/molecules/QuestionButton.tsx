import React from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";

type Props = {
  click: () => void;
};
const QuestionButton: React.FC<Props> = ({ click }) => {
  return (
    <Button onClick={click}>
      <Icon />
    </Button>
  );
};

export default QuestionButton;

const Button = styled.button`
  align-items: center;
  display: inline-block;
  background: none;
  border: none;
  padding: 0;
`;

const Icon = styled.span`
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${getColor("secondary")};
  vertical-align: middle;
  position: relative;
  &:after {
    content: "?";
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1;
    font-size: 1.6rem;
  }
`;
