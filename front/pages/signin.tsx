import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from '../component/atoms/Logo';
import DefaultTemplate from '../component/templates/Default';
import Typography from '../component/atoms/Typography';
import AuthPanel from '../component/features/auth/AuthPanel';
import Toaster from '../component/molecules/Toaster';

export default function Signin() {

  const router = useRouter();

  const [toaster, setToaster] = useState<{
    isActive: boolean;
    text: string;
  }>({
    isActive: false,
    text: ''
  });

  useEffect(() => {

    const { type } = router.query;
    if (!type) return;

    // トースター処理
    if (type === 'postRedirect') {
      activeToaster();
    }

  }, []);

  const activeToaster = () => {
    const text = '投稿にはログインが必要です。ログインしてください。';
    setToaster({
      isActive: true,
      text
    });

    setTimeout(() => {
      setToaster({
        isActive: false,
        text: ''
      })
    }, 5000);
  }

  return (
    <DefaultTemplate>
      <>
        <ItemLogo>
          <Logo />
        </ItemLogo>

        <Toaster isActive={toaster.isActive} text={toaster.text}>
          <Typography>投稿にはログインが必要です。</Typography>
          <Typography>ログインしてください。</Typography>
        </Toaster>

        <AuthPanel authType="signin" />
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