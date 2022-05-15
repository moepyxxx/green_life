import React, { useState } from "react";
import styled from "styled-components";

import Typography from "../../parts/Typography";
import File from "../../parts/form/File";

import { IPost } from "../../../pages/posts/interfaces/post";

type Props = {
  post: IPost;
  setPost: (post: IPost) => void;
  setImageFile: (file: File) => void;
};

const CreateStep1: React.FC<Props> = ({ post, setPost, setImageFile }) => {
  const [isImageSelected, setIsImageSelected] = useState<boolean>(false);

  return (
    <>
      <Typography color="primary" size="medium" weight="bold">
        {isImageSelected ? "選択完了！" : "選択されていません"}
      </Typography>
      <File
        setImageFile={setImageFile}
        setSelectFlag={() => setIsImageSelected(true)}
      />
      <Typography color="secondary" size="small" margin="8px 0 16px">
        ドラッグ＆ドロップもしくはクリックで選択
      </Typography>
    </>
  );
};

const FlexWrap = styled.div`
  width: calc(50% - 8px);
  margin-bottom: 16px;
`;

export default CreateStep1;
