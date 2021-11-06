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
          <Wrapper1>
            <Wrapper1Content>
              <Image src={'/' + posts[1].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[2].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[3].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[4].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[5].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[6].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[7].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[8].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[9].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
          </Wrapper1>
        </Layout>
        <Layout>
          <Wrapper2Main>
            <Wrapper2MainImg>
              <Image src={'/' + posts[10].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper2MainImg>
            <Wrapper2MainText>ほらほらほら<br />こうやっておくと<br />超かわいい！</Wrapper2MainText>
          </Wrapper2Main>
          <Wrapper2Sub>
            <Image src={'/' + posts[11].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
          </Wrapper2Sub>
          <Wrapper2Comment>なんだかすてきな Life になる気がしてきた</Wrapper2Comment>
        </Layout>
        <Layout>
          <Wrapper3Img1>
            <Image src={'/' + posts[12].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
          </Wrapper3Img1>
          <Wrapper3Img2>
            <Image src={'/' + posts[13].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
          </Wrapper3Img2>
          <Wrapper3Img3>
            <Image src={'/' + posts[14].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
          </Wrapper3Img3>
          <Wrapper3Img4>
            <Image src={'/' + posts[15].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
          </Wrapper3Img4>
        </Layout>
        <Layout>
          <Wrapper1>
            <Wrapper1Content>
              <Image src={'/' + posts[16].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[17].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[18].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[19].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[20].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[21].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[22].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[23].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
            <Wrapper1Content>
              <Image src={'/' + posts[24].imagePath} alt="サンプル画像" height="600" width="600" objectFit="cover" />
            </Wrapper1Content>
          </Wrapper1>
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
const Wrapper1 = styled.div`
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper1Content = styled.div`
  width: calc( calc(100% - 32px) / 3);
  margin-bottom: 16px;
`;
const Wrapper2Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 80px;
`;
const Wrapper2MainImg = styled.div`
  width: 50%;
`;
const Wrapper2MainText = styled.p`
  padding: 0 24px;
  font-size: 14px;
  width: 50%;
  line-height: 2;
`;
const Wrapper2Sub = styled.div`
  padding: 0 0 0 40px;
`;
const Wrapper2Comment = styled.p`
  margin: 0 auto;
  text-align: center;
  padding: 80px 0 0;
`;
const Wrapper3Img1 = styled.div`
  text-align: center;
  padding: 0 0 0 80px;
  margin: 0 auto 36px;
  width: 240px;
`;
const Wrapper3Img2 = styled.div`
  text-align: center;
  padding: 0 80px 0 0;
  margin: 0 auto 36px;
  width: 240px;
`;
const Wrapper3Img3 = styled.div`
  text-align: center;
  padding: 0 0 0 80px;
  margin: 0 0 36px auto;
  width: 240px;
`;
const Wrapper3Img4 = styled.div`
  text-align: center;
  padding: 0 40px;
  width: 240px;
  margin: 0 auto;
`;


export const getStaticProps: GetStaticProps = async () => {

  const query = new URLSearchParams({ page : '1', count: '25' });
  const url = `http://server:3001/posts?${query}`;

  const { page, posts } = await (await fetch(url)).json();

  return {
    props: {
      page,
      posts
    },
    revalidate: 60
  };
}