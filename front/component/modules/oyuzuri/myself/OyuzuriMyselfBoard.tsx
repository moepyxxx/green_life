import Image from "next/image";
import styled from "styled-components";
import React, { useContext, useState } from "react";
import { PostContext } from "../../../../pages/posts/[id]";
import { Flex } from "../../../../styles/components/Flex";
import { Spacing } from "../../../../styles/components/Spacing";
import getOyuzuriStatueLabel from "../../../../utility/getOyuzuriStatusLabel";
import Box from "../../../parts/Box";
import Message from "../../../parts/Message";
import Modal from "../../../parts/popup/Modal";
import Shadow from "../../../parts/popup/Shadow";
import TextBudge from "../../../parts/TextBudge";
import Typography from "../../../parts/Typography";
import ExplanationButton from "../../common/ExplanationButton";
import ReadTitle from "../../common/ReadTitle";
import Tag from "../../tag/Tag";
import WantedlyField from "./WantedlyField";
import ConfirmField from "./ConfirmField";
import MessagingField from "./MessagingField";

const OyuzuriMyselfBoard = () => {
  const { oyuzuri } = useContext(PostContext);
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
  if (!oyuzuri) return;
  return (
    <>
      <Box bgColor="primary" paddingH={5} paddingV={5} radius={2}>
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" justifyContent="space-between">
              <Typography color="white" size="large" weight="bold">
                おゆずり受付中
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
          <Spacing mt={3} mb={4}>
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
            mainColor="primary"
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

export default OyuzuriMyselfBoard;
