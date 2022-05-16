import Image from "next/image";
import React, { useContext, useState } from "react";
import { PostContext } from "../../../../pages/posts/[id]";

import Modal from "../../../parts/popup/Modal";
import Shadow from "../../../parts/popup/Shadow";
import Typography from "../../../parts/Typography";
import Button from "../../../parts/Button";
import RequestUserCard from "./RequestUserCard";
import Box from "../../../parts/Box";

import { Spacing } from "../../../../styles/components/Spacing";
import { TextAlign } from "../../../../styles/components/TextAlign";
import { Flex } from "../../../../styles/components/Flex";
import PartnerMessage from "../../message/PartnerMessage";
import OwnMessage from "../../message/OwnMessage";

const ConfirmField = () => {
  const { oyuzuri } = useContext(PostContext);

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  if (!oyuzuri) return;

  return (
    <>
      <Spacing mt={6} mb={2}>
        <Typography size="large" color="white" weight="bold">
          おゆずり先ユーザー
        </Typography>
        <RequestUserCard click={() => null} user={oyuzuri.oyuzuriTargetUser} />
        <Spacing mt={5}>
          <TextAlign align="center">
            <Button
              click={() => setIsModalActive(true)}
              bgColor="accent"
              size="medium"
              color="white"
              borderColor="accent"
            >
              送信メッセージを確認
            </Button>
          </TextAlign>
        </Spacing>
      </Spacing>

      <Shadow isActive={isModalActive} />

      <Modal
        isActive={isModalActive}
        closeAction={() => setIsModalActive(false)}
      >
        <>
          <PartnerMessage
            bgColor="base"
            contents={{
              message: oyuzuri.oyuzuriTargetUser.message,
              user: {
                displayName: oyuzuri.oyuzuriTargetUser.displayName,
                userName: oyuzuri.oyuzuriTargetUser.userName,
                thumbnailUrl: oyuzuri.oyuzuriTargetUser.thumbnailUrl,
              },
              createdAt: oyuzuri.oyuzuriTargetUser.createdAt,
            }}
          />
          <OwnMessage
            contents={{
              message: oyuzuri.confirmMessage,
              createdAt: oyuzuri.updatedAt,
            }}
          />
          <TextAlign align="center">
            <Button
              size="medium"
              click={() => setIsModalActive(false)}
              bgColor="primary"
            >
              閉じる
            </Button>
          </TextAlign>
        </>
      </Modal>
    </>
  );
};

export default ConfirmField;
