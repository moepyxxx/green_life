import React, { ReactChild } from "react";
import styled from "styled-components";
import Link from "next/link";
import getColor from "../../utility/getColor";

type Props = {
  children: ReactChild;
  isLink: boolean;
  link?: string;
};
const HashTag: React.FC<Props> = ({ isLink, link, children }) => {
  if (isLink && link) {
    return (
      <List>
        <Link href={link} passHref>
          <InnerLink>
            <Icon />
            <Text>{children}</Text>
          </InnerLink>
        </Link>
      </List>
    );
  } else {
    return (
      <List>
        <Icon />
        <Text>{children}</Text>
      </List>
    );
  }
};

export default HashTag;

const InnerLink = styled.a;

const List = styled.li`
  align-items: center;
  display: inline-block;
`;

const Icon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${getColor("primary")};
  vertical-align: middle;
  margin-right: 8px;
  position: relative;
  &:after {
    content: "#";
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1;
    font-size: 1.2rem;
  }
`;

const Text = styled.span`
  display: inline-block;
  font-size: 1.4rem;
  vertical-align: middle;
`;
