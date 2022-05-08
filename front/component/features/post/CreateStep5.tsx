import React, { useState } from "react";
import styled from "styled-components";
import { IPost } from "../../../pages/posts/interfaces/post";
import Image from "next/image";
import TextBudge from "../../atoms/TextBudge";
import Typography from "../../atoms/Typography";
import RadiusButton from "../../molecules/RadiusButton";
import SquareButton from "../../molecules/SquareButton";
import Shadow from "../../atoms/Shadow";
import Modal from "../../atoms/Modal";
import ReadTitle from "../../molecules/ReadTitle";
import TextArea from "../../atoms/form/TextArea";
import TColor from "../../types/color";
import { Spacing } from "../../../styles/components/Spacing";
import { Flex } from "../../../styles/components/Flex";
import { TextAlign } from "../../../styles/components/TextAlign";
import QuestionButton from "../../molecules/QuestionButton";

type Props = {
  post: IPost;
  setPost: (post: IPost) => void;
  executePost: () => void;
};

const CreateStep5: React.FC<Props> = ({ post, setPost, executePost }) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const oyuzuriComment = e.target.value;
    setPost({ ...post, oyuzuriComment });
  };

  const checkOyuzuriFlagStyle = (
    activeOyuzuriFlag: boolean,
    type: "bgColor" | "color" | "borderColor"
  ): TColor => {
    switch (type) {
      case "bgColor":
        return activeOyuzuriFlag === post.oyuzuriFlag ? "primary" : "white";
      case "borderColor":
        return activeOyuzuriFlag === post.oyuzuriFlag ? "primary" : "disable";
      case "color":
        return activeOyuzuriFlag === post.oyuzuriFlag ? "white" : "disable";
    }
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <RadiusButton
          click={() => setPost({ ...post, oyuzuriFlag: true })}
          margin="0 8px 0"
          column={2}
          color={checkOyuzuriFlagStyle(true, "color")}
          borderColor={checkOyuzuriFlagStyle(true, "borderColor")}
          bgColor={checkOyuzuriFlagStyle(true, "bgColor")}
        >
          オンにする
        </RadiusButton>
        <RadiusButton
          click={() => setPost({ ...post, oyuzuriFlag: false })}
          margin="0 8px 0"
          column={2}
          color={checkOyuzuriFlagStyle(false, "color")}
          borderColor={checkOyuzuriFlagStyle(false, "borderColor")}
          bgColor={checkOyuzuriFlagStyle(false, "bgColor")}
        >
          オフにする
        </RadiusButton>
      </Flex>

      <TextAlign align="center">
        <Spacing mt={8} mb={5}>
          <QuestionButton click={() => setIsModalActive(true)} />
        </Spacing>
      </TextAlign>

      <OyuzuriComment display={post.oyuzuriFlag ? "block" : "none"}>
        <ReadTitle
          isIcon={false}
          mainTitle="おゆずりコメントの編集"
          subTitle="おゆずりにかける思いや、お返事が欲しい日時、費用、植物の状態などを簡単に記載してください"
        />

        <Spacing mt={6}>
          <TextArea text={post.oyuzuriComment} change={commentChange} />
        </Spacing>
      </OyuzuriComment>

      <SquareButton margin="16px 0 0" click={executePost}>
        この内容で投稿
      </SquareButton>

      <Shadow isActive={isModalActive} />

      <Modal
        isActive={isModalActive}
        closeAction={() => setIsModalActive(false)}
      >
        <>
          <Typography color="secondary" weight="bold">
            おゆずり機能について
          </Typography>
          <Typography size="regular">
            ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
          </Typography>
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
  );
};
const OyuzuriComment = styled.div`
  display: ${(prop) => prop.display};
  text-align: center;
  margin: 32px 0;
`;

const FlexWrap = styled.div`
  width: calc(50% - 8px);
  margin-bottom: 16px;
`;

export default CreateStep5;
