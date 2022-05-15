import React from "react";
import styled from "styled-components";
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
      <Typography size="medium">{text}</Typography>
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
    padding: 0 20px 0 0;
  `}
  ${(props) =>
    props.arrow === "left" &&
    `
    padding: 0 0 0 20px;
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
  &:after {
    ${(props) =>
      props.arrow === "left" &&
      `
      right: 0px;
      background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M14%207L10%2012L14%2017%22%20stroke%3D%22%233E5656%22%2F%3E%3C%2Fsvg%3E');
    `}
    ${(props) =>
      props.arrow === "right" &&
      `
      left: 0px;
      background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%207L14%2012L10%2017%22%20stroke%3D%22%233E5656%22%2F%3E%3C%2Fsvg%3E');
    `}
    background-size: cover;
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
