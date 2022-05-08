import Image from "next/image";
import router from "next/router";
import React from "react";
import styled from "styled-components";
import { IApiOyuzuri } from "../../../../pages/posts/interfaces/apiOyuzuri";
import { Flex } from "../../../../styles/components/Flex";
import { TextAlign } from "../../../../styles/components/TextAlign";
import Typography from "../../../atoms/Typography";
import RadiusButton from "../../../molecules/RadiusButton";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const MessagingPanel: React.FC<Props> = ({ oyuzuri }) => {
  const linkToMessage = () => {
    router.push(`/messages/${oyuzuri.messageContainerId}`);
  };

  return (
    <>
      <OyuzuriOwner display={oyuzuri.isPostMyself ? "display" : "none"}>
        <Typography size="medium" weight="bold">
          ユーザーさんとメッセージ中
        </Typography>
        <Typography size="regular">
          メッセージ画面で最新のやりとりを確認しましょう
        </Typography>
        <Flex alignItems="flex-start" justifyContent="left">
          <UserButton key={oyuzuri.oyuzuriTargetUser.userId}>
            <Image
              unoptimized
              src={oyuzuri.oyuzuriTargetUser.thumbnailUrl}
              alt="ユーザー画像"
              width="400"
              height="400"
              objectFit="cover"
            />
            <Typography size="small" color="primary" family="Bitter">
              {oyuzuri.oyuzuriTargetUser.userName.slice(0, 6) + "…"}
            </Typography>
          </UserButton>
        </Flex>
      </OyuzuriOwner>
      <TextAlign align="center">
        <RadiusButton click={linkToMessage} bgColor="primary">
          メッセージ画面へ
        </RadiusButton>
      </TextAlign>
    </>
  );
};

const OyuzuriOwner = styled.div`
  display: ${(prop) => prop.display};
  margin-top: 32px;
`;

const UserButton = styled.button`
  width: calc(100% / 6);
  border: none;
  padding: 0 8px 4px;
  text-align: center;
  background: none;
  margin-top: 16px;
`;

export default MessagingPanel;
