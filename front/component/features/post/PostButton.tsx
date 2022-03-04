import React from 'react'
import styled from 'styled-components';
import Image from 'next/image'
import AttentionImg from '../../../img/icon/attention.svg';
import getColor from '../../../utility/getColor';
import Pattern2 from '../../pattern/Pattern2';

const PostButton: React.FC = () => {
  return (
    <Button onClick={() => console.log('link to post page')}>
      <WrapPattern>
        <Pattern2 fill='secondary' />
      </WrapPattern>
      <WrapText>
        <Image src={AttentionImg} alt='投稿画面へのリンク（飾り）' />
        <PostText>greenを<br />投稿</PostText>
      </WrapText>
  </Button>
  )
}

export default PostButton

const Button = styled.button`
  width: 116px;
  height: 124px;
  background: transparent;
  border: none;
  position: relative;
`;
const WrapPattern = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const WrapText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const PostText = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: ${getColor('white')};
  letter-spacing: 0.05rem;
  margin-left: 4px;
  width: 100%;
`;