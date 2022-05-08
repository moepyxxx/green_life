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
import Oyuzuri from "../../component/features/post/Oyuzuri";
import { TextAlign } from "../../styles/components/TextAlign";
import { Spacing } from "../../styles/components/Spacing";
import { Flex } from "../../styles/components/Flex";
import isUseLogin from "../../utility/customhooks/isUseLogin";
import { IApiOyuzuri } from "./interfaces/apiOyuzuri";

const PostDetail = () => {
  const apiFetch = useFetch();
  const isLogin = isUseLogin();
  const router = useRouter();

  const [post, setPost] = useState<IApiPostDetail>(null);
  const [oyuzuri, setOyuzuri] = useState<IApiOyuzuri>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [postParagraph, setPostParagraph] = useState<TPostParagraph>();
  const [greenPins, setGreenPins] = useState<TGreenPin[]>([]);

  const [isPlantVisualActive, setIsPlantVisualActive] =
    useState<boolean>(false);

  // [note]: setStateが非同期のため
  // initialize post greenPins/paragraph の順に確実の処理
  useEffect(() => {
    initialize();
  }, []);

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
  }, [post]);

  useEffect(() => {
    if (!postParagraph || !greenPins) return;
    setLoading(false);
  }, [postParagraph, greenPins]);

  const initialize = async () => {
    const apiPost = await apiFetch<IApiPostDetail>(`posts/${router.query.id}`);
    const apiOyuzuri: IApiOyuzuri | null =
      isLogin() && !!apiPost.oyuzuriId
        ? await apiFetch<IApiOyuzuri>(`oyuzuris/${apiPost.oyuzuriId}`, true)
        : null;

    setOyuzuri(apiOyuzuri);
    setPost(apiPost);
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

          {post.oyuzuriFlag && isLogin() ? (
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
