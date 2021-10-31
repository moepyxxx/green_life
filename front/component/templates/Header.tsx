import Image from 'next/image';
import React from 'react'
import styled from 'styled-components';

import Logo from '../atoms/Logo';
import Pattern1 from '../pattern/Pattern1';

import SampleUserImg from '../../img/sample_user.png';

const Header = () => {
  return (
    <HeaderWrap>

      <LogoSpace>
        <Logo />
      </LogoSpace>

      <UserStatusBudge>
        <WrapPattern>
          <Pattern1 fill='primary' />
        </WrapPattern>
        <UserImg>
          <Image src={SampleUserImg} alt="サンプルユーザーアイコン" objectFit="cover" />
        </UserImg>
      </UserStatusBudge>

    </HeaderWrap>
  );
}
export default Header

const HeaderWrap = styled.header`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
const LogoSpace = styled.div`
  padding: 16px 16px 12px 16px;
  width: 160px;
`;
const UserStatusBudge = styled.div`
  width: 48px;
  margin: 8px;
  position: relative;
  cursor: pointer;
`;
const WrapPattern = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const UserImg = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;