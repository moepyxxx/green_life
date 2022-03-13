import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import DefaultTemplate from '../../component/templates/Default';
import ArrowTextLink from '../../component/molecules/ArrowTextLink';
import Switch from '../../component/atoms/Switch';
import SukiButton from '../../component/molecules/SukiButton';
import SwitchingGreenImage, { TGreenPin } from '../../component/features/post/SwitchingGreenImage';
import PostParagraph, { TPostParagraph } from '../../component/features/post/PostParagraph';
import { IApiPostDetail } from './interfaces/apiPostDetail';
import dayjs from 'dayjs';
import useFetch from '../../utility/customhooks/useFetch';
import { useRouter } from 'next/router';
import OyuzuriParagraph, { TOyuzuriParagraph } from '../../component/features/post/OyuzuriParagraph';

const PostDetail = () => {

  const apiFetch = useFetch()
  const router = useRouter()

  const [post, setPost] = useState<IApiPostDetail>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [postParagraph, setPostParagraph] = useState<TPostParagraph>();
  const [greenPins, setGreenPins] = useState<TGreenPin[]>([]);
  const [oyuzuriParagraph, setOyuzuriParagraph] = useState<TOyuzuriParagraph>();

  const [isPlantVisualActive, setIsPlantVisualActive] = useState<boolean>(false);

  // [note]: setStateが非同期のため
  // initialize post greenPins/paragraph の順に確実の処理
  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    if (!post) return;

    setPostParagraph({
      date: dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss ddd'),
      name: post.user.displayName,
      username: post.user.userName,
      description: post.comment,
      tags: post.tags.map(tag => tag.label)
    })

    setGreenPins(post.greenPins.map(pin => {
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
    }))

    setOyuzuriParagraph({
      oyuzuriFlag: post.oyuzuriFlag,
      comment: post.oyuzuriComment,
      isPostMyself: post.isPostMyself,
      oyuzuriRequestUsers: post.oyuzuriRequestUsers,
      oyuzuriRequest: post.oyuzuriRequest,
      oyuzuriId: post.oyuzuriId
    })

  }, [post])

  useEffect(() => {
    if (!postParagraph || !greenPins || !oyuzuriParagraph) return;
    setLoading(false)
  }, [postParagraph, greenPins, oyuzuriParagraph])

  const initialize = async () => {
    const apiPost = await apiFetch<IApiPostDetail>(`posts/${router.query.id}`, true);
    setPost(apiPost);
  }

  const switchPlantVisual = (isActive: boolean) => {
    isActive ? setIsPlantVisualActive(true) : setIsPlantVisualActive(false);
  }

  if (loading) {
    // [memo]: なんとかしたいローディング（笑）
    return <></>;
  } else {
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
              greenPins={greenPins}
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
            paragraph={postParagraph}
          />

          <OyuzuriParagraph
            paragraph={oyuzuriParagraph}
          />
  
        </>
      </DefaultTemplate>
    )
  }
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