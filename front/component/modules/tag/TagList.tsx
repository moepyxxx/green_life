import React from "react";
import styled from "styled-components";
import { IApiTag } from "../../../pages/posts/interfaces/apiTag";
import useToast from "../../../utility/customhooks/useToast";
import Tag from "./Tag";

type Props = {
  tags: IApiTag[];
};
const TagList: React.FC<Props> = ({ tags }) => {
  const toast = useToast();
  return (
    <Contents onClick={() => toast({ text: "hoge" })}>
      {tags.map((tag, index) => {
        return <Tag key={index} label={tag.label} />;
      })}
    </Contents>
  );
};

const Contents = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 12px;
  margin-right: calc(50% - 50vw);
  margin-left: calc(50% - 50vw);
  padding-right: calc(50vw - 50%);
  padding-left: calc(50vw - 50%);
`;

export default TagList;
