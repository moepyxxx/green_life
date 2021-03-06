import React from "react";
import TextArea from "../../parts/form/TextArea";
import { Spacing } from "../../../styles/components/Spacing";
import { IPost } from "../../../pages/posts/interfaces/post";

type Props = {
  post: IPost;
  setPost: (post: IPost) => void;
};

const CreateStep4: React.FC<Props> = ({ post, setPost }) => {
  const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const comment = e.target.value;
    setPost({ ...post, comment });
  };

  return (
    <>
      <Spacing ma="0">
        <TextArea text={post.comment} change={commentChange} />
      </Spacing>
    </>
  );
};

export default CreateStep4;
