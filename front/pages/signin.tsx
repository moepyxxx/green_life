import React from 'react';
import styled from 'styled-components';
import Logo from '../component/atoms/Logo';
import DefaultTemplate from '../component/templates/Default';
import SigninPanel from '../component/features/auth/SigninPanel';
import GreenLifeDescription from '../component/features/auth/GreenLifeDescription';

export default function Signin() {

  return (
    <DefaultTemplate>
      <>
        <ItemLogo>
          <Logo />
        </ItemLogo>

        <SigninPanel />

        <GreenLifeDescription />
      </>
    </DefaultTemplate>
  )
}


const ItemLogo = styled.div`
  margin: 100px auto 60px;
  width: 200px;
`;