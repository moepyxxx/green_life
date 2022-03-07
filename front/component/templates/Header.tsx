import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components';
import useFetch from '../../utility/customhooks/useFetch';
import useIsLogin from '../../utility/customhooks/useIsLogin';
import getColor from '../../utility/getColor';
import Logo from '../atoms/Logo';

const Header = () => {
  
  const [statusNode, setStatusNode] = useState<ReactNode>();
  const [thumbnail, setThumbnail] = useState<string>('https://storage.googleapis.com/greenlife-midori.appspot.com/users/green-chan.png');

  useEffect(() => {
    if (!useIsLogin()) return;
    initializeThumbnail();
  }, []);

  useEffect(() => {
    if (useIsLogin()) {
      setStatusNode(
        <LogginedBudge>
          <Image unoptimized src={thumbnail} alt="ユーザーアイコン" layout="fill" objectFit="cover" />
        </LogginedBudge>
      )
    } else {
      setStatusNode(
        <Link href="/signin" passHref>
          <LogoutBudge>
            Login
          </LogoutBudge>
        </Link>  
      )    
    }
  }, [thumbnail])

  const initializeThumbnail = async () => {
    const { thumbnailUrl } = await useFetch(`users/thumbnail`, true);
    setThumbnail(thumbnailUrl);
  }

  return (
    <HeaderWrap>

      <LogoSpace>
        <Logo />
      </LogoSpace>

      {statusNode}

    </HeaderWrap>
  );
}
export default Header

const HeaderWrap = styled.header`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const LogoSpace = styled.div`
  padding: 16px 16px 12px 16px;
  width: 160px;
`;

const LogginedBudge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 16px;
  position: relative;
  cursor: pointer;
`;

const LogoutBudge = styled.a`
  width: 40px;
  height: 40px;
  display: inline-block;
  background-color: ${getColor("secondary")};
  border-radius: 50%;
  overflow: hidden;
  margin: 16px;
  color: #fff;
  font-family 'Bitter', sans-serif;
  font-size: 1.2rem;
  line-height: 40px;
  padding: 0 0 0 4px;
`;