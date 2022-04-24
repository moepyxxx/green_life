import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import styled from "styled-components";
import Logo from "../component/atoms/Logo";

import DefaultTemplate from "../component/templates/Default";
import CatchCopy from "../component/molecules/CatchCopy";
import PostThumbnailLink, {
  TSummaryThumbnail,
} from "../component/molecules/PostThumbnailLink";

import { Flex } from "../styles/components/Flex";

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <DefaultTemplate>
      <>
        <Title>
          <TitleLogo>
            <Logo />
          </TitleLogo>
          <CatchCopy />
        </Title>

        <Contents alignItems="center" justifyContent="space-between">
          {posts.map((post, index) => {
            const summary: TSummaryThumbnail = {
              imagePath: post.imagePath,
              linkPath: "/posts/" + post._id,
            };
            return (
              <ContentImg key={index}>
                <PostThumbnailLink post={summary} />
              </ContentImg>
            );
          })}
        </Contents>
      </>
    </DefaultTemplate>
  );
}

const Title = styled.div`
  margin: 200px 0 60px;
  text-align: center;

  img {
    width: 180px;
  }
`;

const TitleLogo = styled.div`
  width: 180px;
  margin: 0 auto 20px;
`;

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

export const getStaticProps: GetStaticProps = async () => {
  const query = new URLSearchParams({ page: "1", count: "27" });
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts?${query}`;

  const { page, posts } = await (await fetch(url)).json();

  return {
    props: {
      page,
      posts,
    },
    revalidate: 60,
  };
};
