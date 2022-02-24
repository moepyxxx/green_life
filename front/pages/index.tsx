import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import styled from 'styled-components';
import Image from 'next/image'
import Logo from '../component/atoms/Logo';

import DefaultTemplate from '../component/templates/Default';

export default function Home({ page, posts }: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <DefaultTemplate>
      <>
        <Layout>

          <TitleLogo>
            <Logo />
          </TitleLogo>

          <TitleImg>
            <Image src={'/' + posts[0].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
          </TitleImg>

          <TitleText>
            <TitleLarge>もっと、暮らしを、□ □ □ 。</TitleLarge>
            <TitleSmall>green があれば、今日の生活はどうなるだろう？</TitleSmall>
          </TitleText>

        </Layout>

        <Layout>
          <Contents>
            {posts.map((post => {
              return(
                <ContentImg>
                  <Image src={'/' + post.imagePath} alt={post.comment} height="600" width="600" objectFit="cover" />
                </ContentImg>
              )
            }))}
          </Contents>
        </Layout>
      </>
    </DefaultTemplate>
  )
}


const Layout = styled.section`
  margin-top: 100px;
`;

const TitleLogo = styled.div`
  text-align: center;
  width: 180px;
  margin: 0 auto 76px;
`;
const TitleImg = styled.div`
  margin: 0 auto;
  width: 90vw;
  height: 90vw;
  object-fit: cover;
`;
const TitleText = styled.div`
  margin-top: 76px;
  text-align: center;
`;
const TitleLarge = styled.p`
  font-size: 20px;
  font-family: 'Noto Serif JP', serif;
`;
const TitleSmall = styled.p`
  font-size: 14px;
`;
const Contents = styled.div`
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;
const ContentImg = styled.div`
  width: calc( calc(100% - 32px) / 3);
  margin-bottom: 16px;
`;


export const getStaticProps: GetStaticProps = async () => {

  const query = new URLSearchParams({ page : '1', count: '27' });
  const url = `${process.env.NEXT_PUBLIC_API_URL}posts?${query}`;

  const { page, posts } = await (await fetch(url)).json();

  return {
    props: {
      page,
      posts
    },
    revalidate: 60
  };
}