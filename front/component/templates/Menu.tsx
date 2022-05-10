import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import LogoHome from "../../img/icon/home.svg";
import LogoBell from "../../img/icon/bell.svg";
import LogoEmail from "../../img/icon/email.svg";
import LogoGreen from "../../img/icon/green.svg";
import getColor from "../../utility/getColor";
import useFetch from "../../utility/customhooks/useFetch";
import useIsLogin from "../../utility/customhooks/useIsLogin";

type TThumbnail = {
  thumbnailUrl: string;
};

const Menu = () => {
  const [isLogin] = useIsLogin();
  const apiFetch = useFetch();

  const [thumbnail, setThumbnail] = useState<string>(
    "https://storage.googleapis.com/greenlife-midori.appspot.com/users/green-chan.png"
  );

  useEffect(() => {
    getThumbnail();
  }, [isLogin]);

  const getThumbnail = async () => {
    if (!isLogin) return;
    const result = await apiFetch<TThumbnail>(`users/thumbnail`, true);
    if (!result) return;
    setThumbnail(result.thumbnailUrl);
  };

  return (
    <MenuWrapper>
      <Link href="/" passHref>
        <Image src={LogoHome} alt="ロゴ" />
      </Link>
      <Link href="/" passHref>
        <Image src={LogoBell} alt="ロゴ" />
      </Link>
      <Link href="/posts/create" passHref>
        <Image src={LogoGreen} alt="ロゴ" />
      </Link>
      <Link href="/" passHref>
        <Image src={LogoEmail} alt="ロゴ" />
      </Link>
      {isLogin ? (
        <LogginedBudge>
          <Image
            unoptimized
            src={thumbnail}
            alt="ユーザーアイコン"
            layout="fill"
            objectFit="cover"
          />
        </LogginedBudge>
      ) : (
        <Link href="/signin" passHref>
          <LogoutBudge>Login</LogoutBudge>
        </Link>
      )}
    </MenuWrapper>
  );
};
export default Menu;

const MenuWrapper = styled.div`
  position: fixed;
  background: #fff;
  z-index: 3;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 16px 28px;
  border: none;
  display: flex;
  justify-content: space-between;
`;

const LogginedBudge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
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
  color: #fff;
  font-family 'Bitter', sans-serif;
  font-size: 1.2rem;
  line-height: 40px;
  padding: 0 0 0 4px;
`;
