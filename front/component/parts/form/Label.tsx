import React, { ReactChild } from "react";
import styled from "styled-components";
import getSize from "../../../utility/getSize";

type Props = {
  children: ReactChild;
};

const Label: React.FC<Props> = ({ children }) => {
  return <LabelItem>{children}</LabelItem>;
};

export default Label;

const LabelItem = styled.label`
  font-size: ${getSize("medium")}rem;
  display: block;
  padding-bottom: 4px;
`;
