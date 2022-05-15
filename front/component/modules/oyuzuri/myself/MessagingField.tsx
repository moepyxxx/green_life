import router from "next/router";
import React, { useContext } from "react";

import Typography from "../../../atoms/Typography";
import Button from "../../../parts/Button";
import RequestUserCard from "./RequestUserCard";

import { PostContext } from "../../../../pages/posts/[id]";
import { Spacing } from "../../../../styles/components/Spacing";
import { TextAlign } from "../../../../styles/components/TextAlign";

const MessagingField = () => {
  const { oyuzuri } = useContext(PostContext);

  const linkToMessage = () => {
    if (!oyuzuri) return;
    router.push(`/messages/${oyuzuri.messageContainerId}`);
  };

  if (!oyuzuri) return;

  return (
    <>
      <Spacing mt={6} mb={2}>
        <Typography size="large" color="white" weight="bold">
          おゆずり先ユーザー
        </Typography>
        <RequestUserCard
          click={() => null}
          user={{
            ...oyuzuri.oyuzuriTargetUser,
            message: "ダミー（APIのほう改修して取得できるようにする）",
          }}
        />
        <Spacing mt={5}>
          <TextAlign align="center">
            <Button
              click={linkToMessage}
              bgColor="accent"
              size="medium"
              color="white"
              borderColor="accent"
            >
              最新のメッセージを確認
            </Button>
          </TextAlign>
        </Spacing>
      </Spacing>
    </>
  );
};

export default MessagingField;
