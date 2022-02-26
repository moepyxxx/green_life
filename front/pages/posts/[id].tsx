import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import styled from 'styled-components';

import DefaultTemplate from '../../component/templates/Default';
import ArrowTextLink from '../../component/molecules/ArrowTextLink';
import Switch from '../../component/atoms/Switch';
import SukiButton from '../../component/molecules/SukiButton';
import SwitchingGreenImage, { TGreenPin } from '../../component/features/SwitchingGreenImage';
import PostParagraph, { TParagraph } from '../../component/features/PostParagraph';
import axios from 'axios';
import { IApiPostDetail } from './interfaces/apiPostDetail';
import dayjs from 'dayjs';

const PostDetail: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  { post }: { post: IApiPostDetail }
) => {

  const [isPlantVisualActive, setIsPlantVisualActive] = useState<boolean>(false);

  const switchPlantVisual = (isActive: boolean) => {
    isActive ? setIsPlantVisualActive(true) : setIsPlantVisualActive(false);
  }

  const paragraph: TParagraph = {
    date: dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss ddd'),
    name: post.user.displayName,
    username: post.user.userName,
    description: post.comment,
    tags: post.tags.map(tag => tag.label)
  }

  const greenpins: TGreenPin[] = post.greenPins.map(pin => {
    const { name, description, imagePath } = pin.green;
    const { left, top } = pin.position;
    return {
      green: {
        name,
        description,
        imagePath
      },
      position: {
        left: Number(left),
        top: Number(top),
      }
    }
  });


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
          <SwitchingGreenImage
            isPlantVisualActive={isPlantVisualActive}
            greenPins={greenpins}
            imagePath={post.imagePath}
          />
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
export default PostDetail;

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

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}posts`).then(res => res.data );

  const paths = posts.map(post => ({
    params: { id: post._id }
  }));

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {

  const post: IApiPostDetail = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}posts/${context.params.id}`)
    .then(res => res.data );

  return {
    props: {
      post
    },
    revalidate: 60
  }
}