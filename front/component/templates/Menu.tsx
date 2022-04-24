import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import getColor from "../../utility/getColor";

import AttentionVerticalImg from "../../img/icon/attention_vertical.svg";
import LikeImg from "../../img/icon/heart.svg";
import SearchImg from "../../img/icon/search.svg";

import Pattern1 from "../pattern/Pattern1";
import IconButton from "../atoms/IconButton";
import PostButton from "../features/post/PostButton";
import { Spacing } from "../../styles/components/Spacing";

const Menu = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  if (isActive) {
    return (
      <MenuInner>
        <Spacing mb={2}>
          <IconButton
            fill="secondary"
            click={() => console.log("link to like page")}
          >
            <Image src={LikeImg} alt="お気に入りページへのリンク" />
          </IconButton>
        </Spacing>
        <Spacing mb={2}>
          <IconButton
            fill="secondary"
            click={() => console.log("link to search page")}
          >
            <Image src={SearchImg} alt="検索ページへのリンク" />
          </IconButton>
        </Spacing>
        <Spacing mb={2}>
          <PostButton />
        </Spacing>
        <IconButton fill="secondary" click={() => setIsActive(false)}>
          <Close />
        </IconButton>
      </MenuInner>
    );
  } else {
    return (
      <MenuOpenBtn onClick={() => setIsActive(true)}>
        <WrapPattern>
          <Pattern1 fill="secondary" />
        </WrapPattern>
        <WrapImg>
          <Image src={AttentionVerticalImg} alt="メニューを開くボタン" />
        </WrapImg>
      </MenuOpenBtn>
    );
  }
};
export default Menu;

const MenuOpenBtn = styled.button`
  position: fixed;
  z-index: 3;
  bottom: 20px;
  right: 32px;
  width: 52px;
  height: 52px;
  background: transparent;
  border: none;
`;
const WrapPattern = styled.span`
  display: block;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const WrapImg = styled.span`
  display: block;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 80%;
    margin-top: 2px;
  }
`;
const MenuInner = styled.div`
  position: fixed;
  z-index: 3;
  bottom: 20px;
  right: 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;
const Close = styled.span`
  width: 40px;
  height: 40px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  display: block;
  &:after,
  &:before {
    content: "";
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 20px;
    background-color: ${getColor("primary")};
  }
  &:after {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
