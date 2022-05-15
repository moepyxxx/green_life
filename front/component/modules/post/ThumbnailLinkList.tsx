import React, { useContext } from "react";
import styled from "styled-components";
import { Flex } from "../../../styles/components/Flex";
import { TSummaryThumbnail } from "./ThumbnailLink";
import { PostContext } from "../../../pages";
import ThumbnailLink from "./ThumbnailLink";

const ThumbnailLinkList = () => {
  const posts = useContext(PostContext);

  return (
    <Contents alignItems="center" justifyContent="space-between">
      {posts.map((post, index) => {
        const summary: TSummaryThumbnail = {
          imagePath: post.imagePath,
          linkPath: "/posts/" + post._id,
        };
        return (
          <ContentImg key={index}>
            <ThumbnailLink post={summary} />
          </ContentImg>
        );
      })}
    </Contents>
  );
};

const Contents = styled(Flex)`
  position: relative;
  &:after {
    content: "";
    display: block;
    width: calc(calc(100% - 32px) / 3);
  }
`;
const ContentImg = styled.div`
  width: calc(calc(100% - 32px) / 3);
  margin-bottom: 16px;
`;

export default ThumbnailLinkList;
