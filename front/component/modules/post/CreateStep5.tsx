import React from "react";
import styled from "styled-components";
import { IPost } from "../../../pages/posts/interfaces/post";

import ReadTitle from "../../modules/common/ReadTitle";
import TextArea from "../../parts/form/TextArea";

import { Spacing } from "../../../styles/components/Spacing";
import { Flex } from "../../../styles/components/Flex";

import TColor from "../../types/color";
import Button from "../../parts/Button";

type Props = {
  post: IPost;
  setPost: (post: IPost) => void;
  executePost: () => void;
};

const CreateStep5: React.FC<Props> = ({ post, setPost, executePost }) => {
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
        return activeOyuzuriFlag === post.oyuzuriFlag ? "secondary" : "white";
      case "borderColor":
        return "secondary";
      case "color":
        return activeOyuzuriFlag === post.oyuzuriFlag ? "white" : "secondary";
    }
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Button
          click={() => setPost({ ...post, oyuzuriFlag: true })}
          margin="0 8px 0"
          size="regular"
          color={checkOyuzuriFlagStyle(true, "color")}
          borderColor={checkOyuzuriFlagStyle(true, "borderColor")}
          bgColor={checkOyuzuriFlagStyle(true, "bgColor")}
        >
          オンにする
        </Button>
        <Button
          click={() => setPost({ ...post, oyuzuriFlag: false })}
          margin="0 8px 0"
          size="regular"
          color={checkOyuzuriFlagStyle(false, "color")}
          borderColor={checkOyuzuriFlagStyle(false, "borderColor")}
          bgColor={checkOyuzuriFlagStyle(false, "bgColor")}
        >
          オフにする
        </Button>
      </Flex>

      <OyuzuriComment display={post.oyuzuriFlag ? "block" : "none"}>
        <ReadTitle main="おゆずりコメントの編集" />

        <Spacing mt={6}>
          <TextArea
            text={post.oyuzuriComment}
            change={commentChange}
            placeHolder="おゆずりにかける思いや、お返事が欲しい日時、費用、植物の状態などを簡単に記載してください"
          />
        </Spacing>
      </OyuzuriComment>

      <Button margin="32px 0 0" click={executePost}>
        この内容で投稿
      </Button>
    </>
  );
};
const OyuzuriComment = styled.div`
  display: ${(prop) => prop.display};
  text-align: center;
  margin: 32px 0 0;
`;

export default CreateStep5;
