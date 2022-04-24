import React from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";
import Typography from "../atoms/Typography";

type Props = {
  text: string;
  arrow: "left" | "right";
  click: () => void;
};
const ArrowTextButton: React.FC<Props> = ({ click, text, arrow }) => {
  return (
    <Button onClick={click}>
      <Icon arrow={arrow} />
      <Typography size="regular" margin="0 8px">
        {text}
      </Typography>
    </Button>
  );
};

export default ArrowTextButton;

const Button = styled.button`
  cursor: pointer;
  position: relative;
  border: none;
  background-color: transparent;
`;

const Icon = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  transform: translateY(-50%);
  ${(props) =>
    props.arrow === "right" &&
    `
    right: 0;
  `}
  ${(props) =>
    props.arrow === "left" &&
    `
    left: 0;
  `}
  &:after, &:before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    top: 50%;
    transform: rotate(45deg) translateY(-50%);
  }

  &:before {
    background: ${getColor("secondary")};
    ${(props) =>
      props.arrow === "left" &&
      `
      left: 0;
    `}
    ${(props) =>
      props.arrow === "right" &&
      `
      right: 0;
    `}
  }

  &:after {
    background: #fff;
    ${(props) =>
      props.arrow === "left" &&
      `
      left: 2px;
    `}
    ${(props) =>
      props.arrow === "right" &&
      `
      right: 2px;
    `}
  }
`;
