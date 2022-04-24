import React from "react";
import styled from "styled-components";
import { Flex } from "../../../styles/components/Flex";
import Typography from "../../atoms/Typography";
import HashTag from "../../molecules/HashTag";

export type TPostParagraph = {
  name: string;
  username: string;
  date: string;
  description: string;
  tags: string[];
};

type Props = {
  paragraph: TPostParagraph;
};
const PostParagraph: React.FC<Props> = ({ paragraph }) => {
  return (
    <>
      <Flex>
        <Typography size="medium" margin="0 8px 0 0">
          {paragraph.name}
        </Typography>
        <Typography
          size="medium"
          family="Bitter"
        >{`@${paragraph.username}`}</Typography>
      </Flex>

      <Typography size="small" family="Bitter">
        <span suppressHydrationWarning>{paragraph.date}</span>
      </Typography>
      <Typography margin="16px 0">{paragraph.description}</Typography>

      <Tags>
        {paragraph.tags.map((tag, index) => {
          return (
            <HashTag isLink={false} key={index}>
              {tag}
            </HashTag>
          );
        })}
      </Tags>
    </>
  );
};
const Tags = styled.ul`
  li {
    margin: 0 8px 4px 0;
  }
`;

export default PostParagraph;
