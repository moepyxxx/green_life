import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import DefaultTemplate from "../../component/templates/Default";
import ArrowTextButton from "../../component/modules/common/ArrowTextButton";
import Switch from "../../component/parts/Switch";
import SwitchingGreenImage, {
  TGreenPin,
} from "../../component/modules/post/SwitchingGreenImage";

import useFetch from "../../utility/customhooks/useFetch";
import useIsLogin from "../../utility/customhooks/useIsLogin";
import PostBoard from "../../component/modules/post/PostBoard";
import OyuzuriBoard from "../../component/modules/oyuzuri/OyuzuriBoard";

import { Spacing } from "../../styles/components/Spacing";
import { Flex } from "../../styles/components/Flex";

import { IApiOyuzuri } from "./interfaces/apiOyuzuri";
import { IApiPostDetail } from "./interfaces/apiPostDetail";
import { IApiUser } from "./interfaces/apiUser";

type setTypeObject = {
  post: IApiPostDetail;
  user: IApiUser;
  oyuzuri: IApiOyuzuri | false;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

export const PostContext = createContext<setTypeObject>({} as setTypeObject);

const PostDetail = () => {
  const apiFetch = useFetch();
  const router = useRouter();
  const [isLogin] = useIsLogin();

  const [refresh, setRefresh] = useState<boolean>(true);
  const [post, setPost] = useState<IApiPostDetail>(null);
  const [oyuzuri, setOyuzuri] = useState<IApiOyuzuri | false>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [greenPins, setGreenPins] = useState<TGreenPin[]>([]);

  const [isPlantVisualActive, setIsPlantVisualActive] =
    useState<boolean>(false);

  // [note]: setStateが非同期のため
  // initialize post greenPins/paragraph の順に確実の処理
  useEffect(() => {
    if (!refresh) return;
    initializePost();
  }, [isLogin, refresh]);

  useEffect(() => {
    if (!post) return;

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
    if (!greenPins || !post || oyuzuri === null) return;
    setLoading(false);
  }, [oyuzuri]);

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

    setRefresh(false);
  };

  const switchPlantVisual = (isActive: boolean) => {
    isActive ? setIsPlantVisualActive(true) : setIsPlantVisualActive(false);
  };

  const returnTop = () => {
    router.push("/");
  };

  if (loading) {
    // [memo]: なんとかしたいローディング（笑）
    return <></>;
  } else {
    return (
      <DefaultTemplate>
        <>
          <PostContext.Provider
            value={{ post, oyuzuri, user: post.user, setRefresh }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <ArrowTextButton
                click={returnTop}
                text="greenたちへ戻る"
                arrow="left"
              />

              <Switch checked={false} action={switchPlantVisual} />
            </Flex>

            <Spacing mt={4}>
              <SwitchingGreenImage
                isPlantVisualActive={isPlantVisualActive}
                greenPins={greenPins}
                imagePath={post.imagePath}
              />
            </Spacing>

            <PostBoard />

            {isLogin ? <OyuzuriBoard /> : <></>}
          </PostContext.Provider>
        </>
      </DefaultTemplate>
    );
  }
};
export default PostDetail;
