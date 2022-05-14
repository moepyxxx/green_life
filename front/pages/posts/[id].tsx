import React, { useEffect, useState } from "react";

import DefaultTemplate from "../../component/templates/Default";
import ArrowTextLink from "../../component/molecules/ArrowTextLink";
import Switch from "../../component/atoms/Switch";
import SukiButton from "../../component/molecules/SukiButton";
import SwitchingGreenImage, {
  TGreenPin,
} from "../../component/features/post/SwitchingGreenImage";
import PostParagraph, {
  TPostParagraph,
} from "../../component/features/post/PostParagraph";
import { IApiPostDetail } from "./interfaces/apiPostDetail";
import dayjs from "dayjs";
import useFetch from "../../utility/customhooks/useFetch";
import { useRouter } from "next/router";
import Oyuzuri from "../../component/features/oyuzuri/Oyuzuri";
import { TextAlign } from "../../styles/components/TextAlign";
import { Spacing } from "../../styles/components/Spacing";
import { Flex } from "../../styles/components/Flex";
import { IApiOyuzuri } from "./interfaces/apiOyuzuri";
import useIsLogin from "../../utility/customhooks/useIsLogin";

const PostDetail = () => {
  const apiFetch = useFetch();
  const router = useRouter();
  const [isLogin] = useIsLogin();

  const [post, setPost] = useState<IApiPostDetail>(null);
  const [oyuzuri, setOyuzuri] = useState<IApiOyuzuri | false>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [postParagraph, setPostParagraph] = useState<TPostParagraph>();
  const [greenPins, setGreenPins] = useState<TGreenPin[]>([]);

  const [isPlantVisualActive, setIsPlantVisualActive] =
    useState<boolean>(false);

  // [note]: setStateが非同期のため
  // initialize post greenPins/paragraph の順に確実の処理
  useEffect(() => {
    initializePost();
  }, [isLogin]);

  useEffect(() => {
    if (!post) return;

    setPostParagraph({
      date: dayjs(post.createdAt).format("YYYY-MM-DD HH:mm:ss ddd"),
      name: post.user.displayName,
      username: post.user.userName,
      description: post.comment,
      tags: post.tags.map((tag) => tag.label),
    });

    setGreenPins(
      post.greenPins.map((pin) => {
        const { name, description, imagePath } = pin.green;
        const { left, top } = pin.position;
        return {
          green: {
            name,
            description,
            imagePath,
          },
          position: {
            left: Number(left),
            top: Number(top),
          },
        };
      })
    );

    initializeOyuzuri();
  }, [post]);

  useEffect(() => {
    if (!postParagraph || !greenPins || !post || oyuzuri === null) return;
    setLoading(false);
  }, [postParagraph]);

  const initializePost = async () => {
    const apiPost = await apiFetch<IApiPostDetail>(`posts/${router.query.id}`);
    setPost(apiPost);
  };

  const initializeOyuzuri = async () => {
    const apiOyuzuri: IApiOyuzuri | null =
      isLogin && !!post.oyuzuriId
        ? await apiFetch<IApiOyuzuri>(`oyuzuris/${post.oyuzuriId}`, true)
        : null;
    apiOyuzuri == null ? setOyuzuri(false) : setOyuzuri(apiOyuzuri);
  };

  const switchPlantVisual = (isActive: boolean) => {
    isActive ? setIsPlantVisualActive(true) : setIsPlantVisualActive(false);
  };

  if (loading) {
    // [memo]: なんとかしたいローディング（笑）
    return <></>;
  } else {
    return (
      <DefaultTemplate>
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <ArrowTextLink linkPath="/" text="greenたちへ戻る" arrow="left" />

            <Switch checked={false} action={switchPlantVisual} />
          </Flex>

          <Spacing mt={4}>
            <SwitchingGreenImage
              isPlantVisualActive={isPlantVisualActive}
              greenPins={greenPins}
              imagePath={post.imagePath}
            />
          </Spacing>

          <TextAlign align="right">
            <SukiButton isActive={false} count={3000} />
          </TextAlign>

          <PostParagraph paragraph={postParagraph} />

          {post.oyuzuriFlag && isLogin && oyuzuri ? (
            <Oyuzuri oyuzuri={oyuzuri} />
          ) : (
            <></>
          )}
        </>
      </DefaultTemplate>
    );
  }
};
export default PostDetail;
