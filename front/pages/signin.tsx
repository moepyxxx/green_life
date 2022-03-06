import React from 'react';
import styled from 'styled-components';
import Logo from '../component/atoms/Logo';
import DefaultTemplate from '../component/templates/Default';
import AuthPanel from '../component/features/auth/AuthPanel';

export default function Signin() {

  return (
    <DefaultTemplate>
      <>
        <ItemLogo>
          <Logo />
        </ItemLogo>

        <AuthPanel authType="signin" />
      </>
    </DefaultTemplate>
  )
}


const ItemLogo = styled.div`
  margin: 100px auto 60px;
  width: 200px;
`;