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
        <RequestUserCard
          click={() => setIsModalActive(true)}
          user={oyuzuri.oyuzuriTargetUser}
        />
        <Spacing mt={5}>
          <TextAlign align="center">
            <Button
              click={() => console.log("取り下げる")}
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
          <Flex alignItems="center">
            <Image
              unoptimized
              src={oyuzuri.oyuzuriTargetUser.thumbnailUrl}
              width="40"
              height="40"
              alt="ユーザー画像"
            />
            <Spacing pl={2}>
              <Typography size="medium">
                {oyuzuri.oyuzuriTargetUser.displayName}
              </Typography>
              <Typography size="regular" family="Bitter" margin="-4px 0 0">
                @{oyuzuri.oyuzuriTargetUser.userName}
              </Typography>
            </Spacing>
          </Flex>
          <Spacing mt={6} mb={8}>
            <Box bgColor="disable" paddingH={3} paddingV={3}>
              <Typography size="medium">
                {oyuzuri.oyuzuriTargetUser.message}
              </Typography>
            </Box>
          </Spacing>
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
