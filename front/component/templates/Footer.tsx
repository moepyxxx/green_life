import React from 'react'
import styled from 'styled-components';
import getColor from '../../utility/getColor';

import Logo from '../atoms/Logo';
import Wave from '../pattern/Wave';


const Footer = () => {
  return (
    <FooterWrap>
      <Wave />
      <FooterText>
        <FooterLogo>
          <Logo color='white' />
        </FooterLogo>
        <FooterCatch>もっと、暮らしを、□ □ □ 。</FooterCatch>
        <FooterCopy>@ copyright Moeko Iwai All right Reserved.</FooterCopy>
      </FooterText>
    </FooterWrap>
  );
}
export default Footer

const FooterWrap = styled.footer`
  margin-top: 88px;
`;
const FooterText = styled.div`
  background-color: ${getColor('primary')};
  width: 100%;
  padding: 80px 20px 20px;
  text-align: center;
`;
const FooterLogo = styled.div`
  width: 160px;
  margin: 0 auto;
`;
const FooterCatch = styled.p`
  font-size: 14px;
  font-family: 'Noto Serif JP', serif;
  color: ${getColor('white')};
  margin-top: 4px;
`;
const FooterCopy = styled.p`
  margin-top: 60px;
  font-size: 12px;
  color: ${getColor('white')};
  letter-spacing: 0.05rem;
`;