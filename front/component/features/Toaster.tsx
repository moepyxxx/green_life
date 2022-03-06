import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import getColor from '../../utility/getColor';
import Typography from '../atoms/Typography';
import Tree from '../pattern/Tree';

const Toaster: React.FC = () => {
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

    let text = '';
    switch (type) {
      case  'needLogin':
        text = '投稿にはログインが必要です。ログインしてください。';
        break;      
      case  'signin':
        text = 'サインインしました。さっそくgreenをポストしてみましょう！';
        break;
      case  'signup':
        text = 'greenLifeへようこそ！チームのgreenを見たり、自分のgreenをポストしてね！';
        break;      
    }
    activeToaster(text);

  }, []);


  const activeToaster = (text) => {
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
    <Contents display={toaster.isActive ? 'fixed' : 'none'}>
      <IconContents><Tree color="secondary" /></IconContents>
      <TextContents><Typography size="regular">{toaster.text}</Typography></TextContents>
  </Contents>
  );
}

export default Toaster

const Contents = styled.div`
  position: fixed;
  display: ${props => props.display};
  width: calc(100% - 32px);
  top: 72px;
  left: 16px;
  z-index: 5;
  background-color: ${getColor('gray')};
  border-radius: 4px;
  padding: 20px;
  flex-wrap: wrap;
`;

const IconContents = styled.div`
  width: 40px;

  svg {
    margin: 8px 0;
    width: 70%;
  }
`;

const TextContents = styled.div`
  width: calc(100% - 40px);
`;