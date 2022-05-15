import React from "react";
import styled from "styled-components";
import getColor from "../../../utility/getColor";
import getShadow from "../../../utility/getShadow";
import getSize from "../../../utility/getSize";

type Props = {
  change: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type?: string;
  placeholder?: string;
};

const Text: React.FC<Props> = ({
  change,
  value,
  type = "text",
  placeholder = "",
}) => {
  return (
    <InputItem
      type={type}
      onChange={change}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default Text;

const InputItem = styled.input`
  background-color: #fff;
  padding: 16px;
  width: 100%;
  border: none;
  border-radius: 4px;
  box-shdaow: ${getShadow()};
  ::placeholder {
    color: ${getColor("thin")};
    font-size: ${getSize("medium")}rem;
    font-family: "Noto Sans JP", sans-serif;
  }
`;
