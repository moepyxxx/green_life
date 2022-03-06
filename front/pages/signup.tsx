import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../component/atoms/Logo';
import AuthPanel from '../component/features/auth/AuthPanel';

import DefaultTemplate from '../component/templates/Default';

export default function SignUp() {

  const router = useRouter();

  return (
    <DefaultTemplate>
      <>
        <ItemLogo>
          <Logo />
        </ItemLogo>

        <AuthPanel authType="signup" />
      </>
    </DefaultTemplate>
  )
}


const ItemLogo = styled.div`
  margin: 100px auto 60px;
  width: 200px;
`;


const Title = styled.div`
  margin-top: 76px;
  text-align: center;

  img {
    width: 180px;
  }
`;

const TitleLogo = styled.div`
  width: 180px;
  margin: 0 auto 20px;
`;

const Contents = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  &:after {
    content: '';
    display: block;
    width: calc( calc(100% - 32px) / 3);
  }
`;
const ContentImg = styled.div`
  width: calc( calc(100% - 32px) / 3);
  margin-bottom: 16px;
`;