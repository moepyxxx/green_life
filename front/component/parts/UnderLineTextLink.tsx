import React, { ReactChild } from "react";
import Link from "next/link";
import styled from "styled-components";
import Typography from "../parts/Typography";
import TSize from "../types/size";
import TColor from "../types/color";

type Props = {
  size?: TSize;
  linkPath: string;
  children: ReactChild;
  color?: TColor;
};
const UnderLineTextLink: React.FC<Props> = ({
  size = "regular",
  color = "primary",
  linkPath,
  children,
}) => {
  return (
    <Link href={linkPath} passHref>
      <LinkInner>
        <Typography tag="span" size={size} color={color} underline={true}>
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
