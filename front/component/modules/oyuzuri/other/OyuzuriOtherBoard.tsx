import React, { useContext, useState } from "react";

import Image from "next/image";
import styled from "styled-components";
import { PostContext } from "../../../../pages/posts/[id]";
import getOyuzuriStatueLabel from "../../../../utility/getOyuzuriStatusLabel";

import Modal from "../../../parts/popup/Modal";
import Shadow from "../../../parts/popup/Shadow";
import TextBudge from "../../../parts/TextBudge";
import Typography from "../../../parts/Typography";
import Box from "../../../parts/Box";
import Message from "../../../parts/Message";
import ExplanationButton from "../../common/ExplanationButton";
import Tag from "../../tag/Tag";
import ReadTitle from "../../common/ReadTitle";
import WantedlyField from "./WantedlyField";
import ConfirmField from "./ConfirmField";
import MessagingField from "./MessagingField";

import { Flex } from "../../../../styles/components/Flex";
import { Spacing } from "../../../../styles/components/Spacing";

const OyuzuriOtherBoard: React.FC = () => {
  const { oyuzuri, user } = useContext(PostContext);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const statusField = () => {
    if (!oyuzuri) return;
    switch (oyuzuri.status) {
      case "wantedly":
        return <WantedlyField />;
      case "confirm":
        return <ConfirmField />;
      case "messaging":
        return <MessagingField />;
    }
  };
  if (!oyuzuri || !user) return;

  return (
    <>
      <Box bgColor="secondary" paddingH={5} paddingV={5} radius={2}>
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" justifyContent="space-between">
              <Typography color="white" size="large" weight="bold">
                おゆずりします！
                <ExplanationButton click={() => setIsModalActive(true)} />
              </Typography>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Tag
                label={getOyuzuriStatueLabel(
                  oyuzuri.status,
                  oyuzuri.isPostMyself,
                  oyuzuri.isTargetUser
                )}
              />
            </Flex>
          </Flex>
          <Flex alignItems="center" justifyContent="left">
            <Image
              unoptimized
              src={user.thumbnailUrl}
              width="40"
              height="40"
              alt="ユーザー画像"
            />
            <Spacing pl={3} mt={2} mb={2}>
              <Typography color="white" size="medium" margin="0 0 -4px">
                おゆずりオーナー
              </Typography>
              <Typography color="white">
                {user.displayName}からのメッセージ
              </Typography>
            </Spacing>
          </Flex>
          <Spacing mb={4}>
            <Message>{oyuzuri.oyuzuriComment}</Message>
          </Spacing>

          {statusField()}
        </>
      </Box>

      <Shadow isActive={isModalActive} />

      <Modal
        isActive={isModalActive}
        closeAction={() => setIsModalActive(false)}
      >
        <>
          <ReadTitle
            align="left"
            main="おゆずり機能について"
            sub="ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー"
            mainColor="secondary"
          />
          <Spacing mt={5}>
            <Flex alignItems="flex-start" justifyContent="space-between">
              <FlexWrap>
                <TextBudge>step 1</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
              <FlexWrap>
                <TextBudge>step 2</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
              <FlexWrap>
                <TextBudge>step 3</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
              <FlexWrap>
                <TextBudge>step 4</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
            </Flex>
          </Spacing>
        </>
      </Modal>
    </>
  );
};

const FlexWrap = styled.div`
  width: calc(50% - 8px);
  margin-bottom: 16px;
`;
export default OyuzuriOtherBoard;
