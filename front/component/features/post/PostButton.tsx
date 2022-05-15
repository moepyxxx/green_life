import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import AttentionImg from "../../../img/icon/attention.svg";
import getColor from "../../../utility/getColor";
import Pattern2 from "../../pattern/Pattern2";
import useIsLogin from "../../../utility/customhooks/useIsLogin";
import useToast from "../../../utility/customhooks/useToast";

const PostButton: React.FC = () => {
  const router = useRouter();
  const [isLogin] = useIsLogin();
  const toast = useToast();

  const link = () => {
    if (isLogin) {
      router.replace("/posts/create");
    } else {
      router.replace("/signin");
      toast({ text: "投稿にはログインが必要です。ログインしてください。" });
    }
  };

  return (
    <Button onClick={link}>
      <WrapPattern>
        <Pattern2 fill="secondary" />
      </WrapPattern>
      <WrapText>
        <Image src={AttentionImg} alt="投稿画面へのリンク（飾り）" />
        <PostText>
          greenを
          <br />
          投稿
        </PostText>
      </WrapText>
    </Button>
  );
};

export default PostButton;

const Button = styled.button`
  width: 116px;
  height: 124px;
  background: transparent;
  border: none;
  position: relative;
`;
const WrapPattern = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const WrapText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const PostText = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: ${getColor("white")};
  letter-spacing: 0.05rem;
  margin-left: 4px;
  width: 100%;
`;
