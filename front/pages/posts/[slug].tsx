import React, { useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import styled from 'styled-components';

import DefaultTemplate from '../../component/templates/Default';
import ArrowTextLink from '../../component/molecules/ArrowTextLink';
import Switch from '../../component/atoms/Switch';
import SukiButton from '../../component/molecules/SukiButton';
import SwitchingGreenImage from '../../component/features/SwitchingGreenImage';
import PostParagraph from '../../component/features/PostParagraph';

export default function postDetail() {

  const [isPlantVisualActive, setIsPlantVisualActive] = useState<boolean>(false);

  const switchPlantVisual = (isActive: boolean) => {
    isActive ? setIsPlantVisualActive(true) : setIsPlantVisualActive(false);
  }

  // [note]: ダミー
  const paragraph = {
    date: '2021.10.30. TUE 22:30',
    name: 'たまちゃん',
    userid: 'tamachan',
    description: 'グリーンインテリアを飾ってみました。やっぱりインテリアっていいね。',
    tags: ['シダ', 'つる植物', '多肉植物']
  }

  return (
    <DefaultTemplate>
      <>
        <FlexBetween>

          <ArrowTextLink
            linkPath='/'
            text='greenたちへ戻る'
            arrow='left'
          />
          
          <Switch
            checked={false}
            action={switchPlantVisual}
          />

        </FlexBetween>

        <MainImage>
          <SwitchingGreenImage isPlantVisualActive={isPlantVisualActive} />
        </MainImage>

        <Reaction>
          <SukiButton
            isActive={false}
            count={3000}
          />
        </Reaction>

        <PostParagraph
          paragraph={paragraph}
        />

      </>
    </DefaultTemplate>
  )
}


const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MainImage = styled.div`
  margin: 16px 0;
`;

const Reaction = styled.div`
  text-align: right;
`;



// export const getStaticProps: GetStaticProps = async () => {

//   const query = new URLSearchParams({ page : '1', count: '27' });
//   const url = `${process.env.NEXT_PUBLIC_API_URL}posts?${query}`;

//   const { page, posts } = await (await fetch(url)).json();

//   return {
//     props: {
//       page,
//       posts
//     },
//     revalidate: 60
//   };
// }