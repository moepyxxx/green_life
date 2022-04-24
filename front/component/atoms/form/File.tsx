import React, { useRef } from "react";
import styled from "styled-components";
import SquareButton from "../../molecules/SquareButton";

type Props = {
  setSelectFlag: () => void;
  setImageFile: (file: File) => void;
};
const File: React.FC<Props> = ({ setSelectFlag, setImageFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const click = () => {
    inputRef.current?.click();
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectFlag();
    setImageFile(e.target.files[0]);
  };

  return (
    <>
      <FormParts
        type="file"
        onChange={change}
        ref={inputRef}
        hidden
        placeholder="このグリーン、とっても素敵でしょう！"
        accept="image/jpeg, image/png"
      />
      <SquareButton click={click}>ここへ選択してね</SquareButton>
    </>
  );
};

export default File;

const FormParts = styled.input`
  display: none;
`;
