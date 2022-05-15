import React, { useState } from "react";
import styled from "styled-components";

import Typography from "../../atoms/Typography";
import File from "../../atoms/form/File";

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
      <Typography color="secondary" size="medium" weight="bold">
        {isImageSelected ? "選択完了！" : "選択されていません"}
      </Typography>
      <File
        setImageFile={setImageFile}
        setSelectFlag={() => setIsImageSelected(true)}
      />
      <Typography color="disable" size="small" margin="8px 0 16px">
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
