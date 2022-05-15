import React from "react";
import styled from "styled-components";
import getColor from "../../../utility/getColor";
import getShadow from "../../../utility/getShadow";

type Props = {
  change: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
  placeHolder?: string;
};

const TextArea: React.FC<Props> = ({ change, text, placeHolder = "" }) => {
  return (
    <TextAreaItem
      onChange={change}
      placeholder={placeHolder}
      rows={5}
      value={text}
    />
  );
};

export default TextArea;

const TextAreaItem = styled.textarea`
  background-color: #fff;
  border: ${getColor("thin")} 1px solid;
  box-shdaow: ${getShadow()};
  padding: 16px;
  width: 100%;
  border-radius: 4px;
  ::placeholder {
    color: ${getColor("thin")};
    font-size: 1.4rem;
    font-family: "Noto Sans JP", sans-serif;
  }
`;
