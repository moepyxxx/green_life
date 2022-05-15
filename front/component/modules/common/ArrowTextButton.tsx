import React from "react";
import styled from "styled-components";
import getColor from "../../../utility/getColor";
import Typography from "../../parts/Typography";

type Props = {
  text: string;
  arrow: "left" | "right";
  click: () => void;
};
const ArrowTextButton: React.FC<Props> = ({ click, text, arrow }) => {
  return (
    <Button arrow={arrow} onClick={click}>
      <Icon arrow={arrow} />
      <Typography size="regular">{text}</Typography>
    </Button>
  );
};

export default ArrowTextButton;

const Button = styled.button`
  cursor: pointer;
  position: relative;
  border: none;
  background-color: transparent;
  ${(props) =>
    props.arrow === "right" &&
    `
    padding: 0 16px 0 0;
  `}
  ${(props) =>
    props.arrow === "left" &&
    `
    padding: 0 0 0 24px;
  `}
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
      left: 5px;
    `}
    ${(props) =>
      props.arrow === "right" &&
      `
      right: 5px;
    `}
  }

  &:after {
    background: #fff;
    ${(props) =>
      props.arrow === "left" &&
      `
      left: 6px;
    `}
    ${(props) =>
      props.arrow === "right" &&
      `
      right: 6px;
    `}
  }
`;
