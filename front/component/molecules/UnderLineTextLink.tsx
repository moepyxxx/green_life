import React, { ReactChild } from "react";
import Link from "next/link";
import styled from "styled-components";
import Typography from "../atoms/Typography";
import TSize from "../types/size";

type Props = {
  size?: TSize;
  linkPath: string;
  children: ReactChild;
};
const UnderLineTextLink: React.FC<Props> = ({
  size = "regular",
  linkPath,
  children,
}) => {
  return (
    <Link href={linkPath} passHref>
      <LinkInner>
        <Typography tag="span" size={size} color="secondary" underline={true}>
          {children}
        </Typography>
      </LinkInner>
    </Link>
  );
};

export default UnderLineTextLink;

const LinkInner = styled.a`
  display: inline;
`;
