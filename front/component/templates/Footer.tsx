import React from "react";
import styled from "styled-components";
import { Spacing } from "../../styles/components/Spacing";
import getColor from "../../utility/getColor";

import Logo from "../parts/Logo";
import UnderLineTextLink from "../parts/UnderLineTextLink";

const Footer = () => {
  return (
    <Spacing mt={15}>
      <FooterText>
        <FooterLogo>
          <Logo color="white" />
        </FooterLogo>
        <Spacing pa="20px 8px 0">
          <UnderLineTextLink linkPath="/signup" color="white" size="medium">
            サインアップ
          </UnderLineTextLink>
        </Spacing>
        <Spacing pa="0 8px 20px">
          <UnderLineTextLink linkPath="/signin" color="white" size="medium">
            サインイン
          </UnderLineTextLink>
        </Spacing>
        <FooterCopy>@ copyright Moeko.I All right Reserved.</FooterCopy>
      </FooterText>
    </Spacing>
  );
};
export default Footer;

const FooterText = styled.div`
  background-color: ${getColor("primary")};
  width: 100%;
  padding: 52px 20px 20px;
  text-align: center;
`;
const FooterLogo = styled.div`
  width: 160px;
  margin: 0 auto;
`;

const FooterCopy = styled.p`
  margin-top: 16px;
  font-size: 1.2rem;
  color: ${getColor("white")};
  letter-spacing: 0.05rem;
`;
