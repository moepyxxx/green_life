import Image from 'next/image';
import React from 'react'
import styled from 'styled-components';

import Logo from '../atoms/Logo';
import Pattern1 from '../pattern/Pattern1';

const Header = () => {
  return (
    <HeaderWrap>

      <LogoSpace>
        <Logo />
      </LogoSpace>

      <UserStatusBudge>
        <Image src={'/sample_user.png'} alt="サンプルユーザーアイコン" layout="fill" objectFit="cover" />
      </UserStatusBudge>

    </HeaderWrap>
  );
}
export default Header

const HeaderWrap = styled.header`
  position: fixed;
  z-index: 3;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 16px;
  position: relative;
  cursor: pointer;
`;