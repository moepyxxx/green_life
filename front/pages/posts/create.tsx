import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";

import DefaultTemplate from "../../component/templates/Default";
import Typography from "../../component/atoms/Typography";
import StepCounter from "../../component/modules/common/step/Counter";
import StepContent from "../../component/modules/common/step/Content";
import ReadTitle, {
  Props as ReadTitleProps,
} from "../../component/modules/common/ReadTitle";
import StepPagination, {
  TStepPagination,
} from "../../component/modules/common/step/Pagination";
import Modal from "../../component/parts/popup/Modal";
import Shadow from "../../component/parts/popup/Shadow";
import CreateStep1 from "../../component/modules/post/CreateStep1";
import CreateStep2 from "../../component/modules/post/CreateStep2";
import CreateStep3 from "../../component/modules/post/CreateStep3";
import CreateStep4 from "../../component/modules/post/CreateStep4";
import CreateStep5 from "../../component/modules/post/CreateStep5";

import { Flex } from "../../styles/components/Flex";
import { Spacing } from "../../styles/components/Spacing";
import { TextAlign } from "../../styles/components/TextAlign";
import { IPost } from "./interfaces/post";

import usePostImage from "../../utility/customhooks/usePostImage";
import usePost from "../../utility/customhooks/usePost";
import useExplanationModalsReducer from "../../utility/customhooks/useExplanationModalsReducer";
import TextBudge from "../../component/atoms/TextBudge";

export default function PostCreate() {
  const router = useRouter();
  const apiPostImage = usePostImage();
  const apiPost = usePost();
  const [explanationModals, explanationModalsDispatch] =
    useExplanationModalsReducer();

  type TStepPagioations = {
    back: TStepPagination;
    next: TStepPagination;
  }[];
  const [stepPaginations, setStepPaginations] = useState<TStepPagioations>([]);
  const [currentStep, setCurrentStep] = useState<number>(2);

  const defaultPost: IPost = {
    imagePath: "",
    comment: "",
    greenPins: [],
    tagIds: [],
    oyuzuriFlag: false,
    oyuzuriComment: "",
  };
  const [post, setPost] = useState<IPost>(defaultPost);
  const [imageFile, setImageFile] = useState<File>();

  useEffect(() => {
    if (currentStep !== 2) return;
    saveImageUrl();
  }, [currentStep]);

  useEffect(() => {
    setStepPaginations(createStepPaginations());
  }, []);

  const saveImageUrl = async () => {
    const imageUrl = await apiPostImage(imageFile);
    setPost({ ...post, imagePath: imageUrl });
  };

  const stepper: ReadTitleProps[] = [
    {
      main: "写真を選択",
      sub: "こんにちは！あなたの大好きなグリーンを\nポストしてみましょう。",
      isExplanation: true,
      explanationClick: () =>
        explanationModalsDispatch({
          type: "setModal",
          payload: { loadingImage: true },
        }),
    },
    {
      main: "ピン情報の追加",
      sub: "素敵な写真ですね！ピンをして\n写真のグリーンについて教えてください。",
      isExplanation: true,
      explanationClick: () =>
        explanationModalsDispatch({
          type: "setModal",
          payload: { useGreenPin: true },
        }),
    },
    {
      main: "タグ情報を追加",
      sub: "今日の気分や植物のことなど…自由にタグを\nつけましょう！オリジナルタグでもOKです",
    },
    {
      main: "コメントの編集",
      sub: "グリーンへの愛を込めて\nあなたからのメッセージをどうぞ",
    },
    {
      main: "おゆずり機能のオン",
      sub: "自分のグリーンを誰かに大切に\n育てて欲しい場合はオンにします",
      explanationClick: () =>
        explanationModalsDispatch({
          type: "setModal",
          payload: { useOyuzuri: true },
        }),
    },
  ];

  const createStepPaginations = (): TStepPagioations => {
    const created: TStepPagioations = [];
    stepper.reduce((accu, _, index) => {
      let back: TStepPagination;
      let next: TStepPagination;

      index === 0
        ? (back = {
            isValid: false,
          })
        : (back = {
            isValid: true,
            text: stepper[index - 1].main,
            click: () => setCurrentStep(index),
          });

      index === stepper.length - 1
        ? (next = {
            isValid: false,
          })
        : (next = {
            isValid: true,
            text: stepper[index + 1].main,
            click: () => setCurrentStep(index + 2),
          });

      created.push({
        next,
        back,
      });

      return accu;
    }, 0);

    return created;
  };

  const executePost = async () => {
    const result = await apiPost<IPost, any>("posts", post, true);
    if (!result) return;
    router.push({
      pathname: "/posts/thanks",
      query: {
        _id: result.data.post._id,
      },
    });
  };

  const stepContentsComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CreateStep1
            setImageFile={setImageFile}
            post={post}
            setPost={setPost}
          />
        );
      case 2:
        return <CreateStep2 post={post} setPost={setPost} />;
      case 3:
        return <CreateStep3 post={post} setPost={setPost} />;
      case 4:
        return <CreateStep4 post={post} setPost={setPost} />;
      case 5:
        return (
          <CreateStep5
            post={post}
            setPost={setPost}
            executePost={executePost}
          />
        );
    }
  };

  return (
    <DefaultTemplate>
      <>
        <Spacing ma="0 auto" pa="20px 0">
          <Flex>
            <StepCounter
              allCount={stepPaginations.length}
              currentCount={currentStep}
            />
          </Flex>
        </Spacing>

        {stepPaginations.map((stepPagination, index) => {
          if (stepPaginations.length === 0) return null;
          return (
            <StepContent
              stepCount={index + 1}
              currentCount={currentStep}
              key={index}
            >
              <>
                <ReadTitle
                  main={stepper[currentStep - 1].main}
                  sub={stepper[currentStep - 1].sub}
                  isExplanation={stepper[currentStep - 1].isExplanation}
                  explanationClick={stepper[currentStep - 1].explanationClick}
                />

                <Spacing mt={10} mb={44}>
                  <TextAlign align="center">
                    {stepContentsComponent()}
                  </TextAlign>
                </Spacing>

                <PaginationFixed>
                  <StepPagination
                    next={stepPagination.next}
                    back={stepPagination.back}
                  />
                </PaginationFixed>
              </>
            </StepContent>
          );
        })}

        <Shadow
          isActive={Object.keys(explanationModals).some(
            (key) => explanationModals[key]
          )}
        />

        <Modal
          isActive={explanationModals.loadingImage}
          closeAction={() =>
            explanationModalsDispatch({
              type: "setAllClose",
            })
          }
        >
          <>
            <ReadTitle
              align="left"
              mainColor="secondary"
              main="写真に関する注意点"
              sub="greenLifeのチームがみんなで楽しく写真を見られるように、写真にはいくつかのご遠慮ルールが存在します。"
            />
            <Spacing mt={5}>
              <Flex alignItems="flex-start" justifyContent="space-between">
                <FlexWrap>
                  <Typography margin="0 0 8px" size="regular">
                    ぼやけたグリーンたちの写真
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
                <FlexWrap>
                  <Typography margin="0 0 8px" size="regular">
                    ヒトがメインの写真
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
                <FlexWrap>
                  <Typography margin="0 0 8px" size="regular">
                    グリーン以外の写真
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
              </Flex>
            </Spacing>
          </>
        </Modal>

        <Modal
          isActive={explanationModals.useGreenPin}
          closeAction={() =>
            explanationModalsDispatch({
              type: "setAllClose",
            })
          }
        >
          <>
            <ReadTitle
              align="left"
              mainColor="secondary"
              main="グリーンピンの追加方法"
              sub="グリーンピンを追加することで、画像の中にはどんなグリーンがあるのかを伝えることができます。"
            />
            <Spacing mt={5}>
              <Flex alignItems="flex-start" justifyContent="space-between">
                <FlexWrap>
                  <TextBudge>step 1</TextBudge>
                  <Typography margin="0 0 8px" size="regular">
                    ピンを追加したいところをタップ
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
                <FlexWrap>
                  <TextBudge>step 2</TextBudge>
                  <Typography margin="0 0 8px" size="regular">
                    グリーン名を検索して登録
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
                <FlexWrap>
                  <TextBudge>step 3</TextBudge>
                  <Typography margin="0 0 8px" size="regular">
                    グリーン名を検索して登録
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
                <FlexWrap>
                  <TextBudge>step 4</TextBudge>
                  <Typography margin="0 0 8px" size="regular">
                    必要であれば複数のピンを指定
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
              </Flex>
            </Spacing>
          </>
        </Modal>

        <Modal
          isActive={explanationModals.useOyuzuri}
          closeAction={() =>
            explanationModalsDispatch({
              type: "setAllClose",
            })
          }
        >
          <>
            <ReadTitle
              align="left"
              mainColor="secondary"
              main="おゆずり機能について"
              sub="greenLifeのチームがみんなで楽しく写真を見られるように、写真にはいくつかのご遠慮ルールが存在します。"
            />
            <Spacing mt={5}>
              <Flex alignItems="flex-start" justifyContent="space-between">
                <FlexWrap>
                  <TextBudge>step 1</TextBudge>
                  <Typography margin="0 0 8px" size="regular">
                    ほげほげほげ
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
                <FlexWrap>
                  <TextBudge>step 2</TextBudge>
                  <Typography margin="0 0 8px" size="regular">
                    ほげほげほげ
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
                <FlexWrap>
                  <TextBudge>step 3</TextBudge>
                  <Typography margin="0 0 8px" size="regular">
                    ほげほげほげ
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
                <FlexWrap>
                  <TextBudge>step 4</TextBudge>
                  <Typography margin="0 0 8px" size="regular">
                    ほげほげほげ
                  </Typography>
                  <Image
                    src="/sample_1.jpg"
                    alt="サンプル"
                    width="300"
                    height="300"
                    objectFit="cover"
                  />
                </FlexWrap>
              </Flex>
            </Spacing>
          </>
        </Modal>
      </>
    </DefaultTemplate>
  );
}

const PaginationFixed = styled.div`
  position: fixed;
  transform: translateX(-50%);
  left: 50%;
  bottom: 100px;
  width: calc(100% - 40px);
`;

const FlexWrap = styled.div`
  width: calc(50% - 8px);
  margin-bottom: 16px;
`;
