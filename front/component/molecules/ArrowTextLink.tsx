import React from "react";
import styled from "styled-components";
import Link from "next/link";
import getColor from "../../utility/getColor";

type Props = {
  text: string;
  arrow: "left" | "right";
  linkPath: string;
};
const ArrowTextLink: React.FC<Props> = ({ linkPath, text, arrow }) => {
  return (
    <Link href={linkPath} passHref>
      <InnerLink>
        <Icon arrow={arrow} />
        <Text>{text}</Text>
      </InnerLink>
    </Link>
  );
};

export default ArrowTextLink;

const InnerLink = styled.a`
  position: relative;
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
const Text = styled.span`
  display: inline-block;
  padding: 0 20px;
`;
