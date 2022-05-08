import React from "react";
import styled from "styled-components";
import { Spacing } from "../../styles/components/Spacing";
import getColor from "../../utility/getColor";

import Logo from "../atoms/Logo";
import UnderLineTextLink from "../molecules/UnderLineTextLink";
import Wave from "../pattern/Wave";

const Footer = () => {
  return (
    <Spacing mt={22}>
      <Wave />
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
        <FooterCatch>もっと、暮らしを、□ □ □ 。</FooterCatch>
        <FooterCopy>@ copyright Moeko.I All right Reserved.</FooterCopy>
      </FooterText>
    </Spacing>
  );
};
export default Footer;

const FooterText = styled.div`
  background-color: ${getColor("primary")};
  width: 100%;
  padding: 80px 20px 20px;
  text-align: center;
`;
const FooterLogo = styled.div`
  width: 160px;
  margin: 0 auto;
`;
const FooterCatch = styled.p`
  font-size: 1.4rem;
  color: ${getColor("white")};
  margin-top: 4px;
`;
const FooterCopy = styled.p`
  margin-top: 60px;
  font-size: 1.2rem;
  color: ${getColor("white")};
  letter-spacing: 0.05rem;
`;
