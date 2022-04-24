import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DefaultTemplate from "../../component/templates/Default";
import StepCounter from "../../component/molecules/StepCounter";
import StepContent from "../../component/molecules/StepContent";
import ReadTitle from "../../component/molecules/ReadTitle";
import StepPagination, {
  TStepPagination,
} from "../../component/molecules/StepPagination";
import CreateStep1 from "../../component/features/post/CreateStep1";
import CreateStep2 from "../../component/features/post/CreateStep2";
import CreateStep3 from "../../component/features/post/CreateStep3";
import CreateStep4 from "../../component/features/post/CreateStep4";
import { IPost } from "./interfaces/post";
import usePostImage from "../../utility/customhooks/usePostImage";
import usePost from "../../utility/customhooks/usePost";
import CreateStep5 from "../../component/features/post/CreateStep5";
import { Flex } from "../../styles/components/Flex";
import { Spacing } from "../../styles/components/Spacing";
import { TextAlign } from "../../styles/components/TextAlign";

export default function PostCreate() {
  const router = useRouter();
  const apiPostImage = usePostImage();
  const apiPost = usePost();

  type TStepPagioations = {
    back: TStepPagination;
    next: TStepPagination;
  }[];
  const [stepPaginations, setStepPaginations] = useState<TStepPagioations>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);

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

  const stepTexts = [
    {
      main: "写真を選択",
      sub: "こんにちは！あなたの大好きなグリーンをポストしてみましょう。",
    },
    {
      main: "ピン情報の追加",
      sub: "素敵な写真ですね！ピンをして写真に写っているグリーンのことを教えてください。",
    },
    {
      main: "タグ情報を追加",
      sub: "今日の気分や植物のことなど…自由にタグをつけましょう！オリジナルタグでもOKです",
    },
    {
      main: "コメントの編集",
      sub: "最後の仕上げです！グリーンへの愛を込めてあなたからのメッセージをどうぞ",
    },
    {
      main: "おゆずり機能のオン",
      sub: "もしあなたがお引越しなどの場合や自分のグリーンを誰かに大切に育てて欲しい場合はオンにします",
    },
  ];

  const createStepPaginations = (): TStepPagioations => {
    const created: TStepPagioations = [];
    stepTexts.reduce((accu, _, index) => {
      let back: TStepPagination;
      let next: TStepPagination;

      index === 0
        ? (back = {
            isValid: false,
          })
        : (back = {
            isValid: true,
            text: stepTexts[index - 1].main,
            click: () => setCurrentStep(index),
          });

      index === stepTexts.length - 1
        ? (next = {
            isValid: false,
          })
        : (next = {
            isValid: true,
            text: stepTexts[index + 1].main,
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
                  isIcon={false}
                  mainTitle={stepTexts[currentStep - 1].main}
                  subTitle={stepTexts[currentStep - 1].sub}
                />

                <Spacing mt={10} mb={10}>
                  <TextAlign align="center">
                    {stepContentsComponent()}
                  </TextAlign>
                </Spacing>

                <StepPagination
                  next={stepPagination.next}
                  back={stepPagination.back}
                />
              </>
            </StepContent>
          );
        })}
      </>
    </DefaultTemplate>
  );
}
