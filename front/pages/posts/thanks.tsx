import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router'

import Typography from '../../component/atoms/Typography';
import DefaultTemplate from '../../component/templates/Default';
import SquareButton from '../../component/molecules/SquareButton';

export default function PostThanks() {
  const router = useRouter()
  const { _id } = router.query

  return (
    <DefaultTemplate>
      <Thanks>
        <Typography size="large" color="secondary" weight="bold" margin="0 0 28px" family="Bitter">Thank you for your Post!</Typography>
        <Typography size="regular">ありがとうございます！</Typography>
        <Typography size="regular" margin="0 0 28px">あなたのグリーンが投稿されました。</Typography>
        <SquareButton click={() => router.push(`posts/${_id}`)}>投稿を見てみる</SquareButton>
      </Thanks>
    </DefaultTemplate>
  )
}


const Thanks = styled.div`
  margin: 150px auto 200px;
  text-align: center;
`;
