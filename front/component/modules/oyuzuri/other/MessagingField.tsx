import router from "next/router";
import React, { useContext } from "react";
import { PostContext } from "../../../../pages/posts/[id]";
import { TextAlign } from "../../../../styles/components/TextAlign";
import Box from "../../../parts/Box";
import Button from "../../../parts/Button";
import ReadTitle from "../../common/ReadTitle";

const MessagingField = () => {
  const { oyuzuri } = useContext(PostContext);
  const linkToMessage = () => {
    if (!oyuzuri) return;
    router.push(`/messages/${oyuzuri.messageContainerId}`);
  };

  if (!oyuzuri) return;

  if (!oyuzuri.isRequest) {
    return;
  }

  if (oyuzuri.isTargetUser) {
    return (
      <>
        <Box paddingH={4}>
          <TextAlign align="center">
            <ReadTitle
              align="left"
              main="おゆずりやりとり中です"
              sub="最新のメッセージを確認してください。"
            />
            <Button
              size="medium"
              margin="16px 0"
              borderColor="accent"
              bgColor="accent"
              color="white"
              click={linkToMessage}
            >
              最新のメッセージ確認
            </Button>
          </TextAlign>
        </Box>
      </>
    );
  } else {
    return (
      <Box paddingH={4}>
        <TextAlign align="center">
          <ReadTitle
            align="left"
            main={`おゆずり先に\n選ばれませんでした`}
            sub="多くのリクエストをいただき、他の方におゆずりが決まりました。あなたにgreeenをおゆずりできず、とても残念です。"
          />
        </TextAlign>
      </Box>
    );
  }
};

export default MessagingField;
