import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useFetch from "../../utility/customhooks/useFetch";
import { useRouter } from "next/router";

import DefaultTemplate from "../../component/templates/Default";
import getColor from "../../utility/getColor";
import Modal from "../../component/parts/popup/Modal";
import Shadow from "../../component/parts/popup/Shadow";
import TextArea from "../../component/parts/form/TextArea";
import Button from "../../component/parts/Button";
import ReadTitle from "../../component/modules/common/ReadTitle";
import PartnerMessage from "../../component/modules/message/PartnerMessage";
import OwnMessage from "../../component/modules/message/OwnMessage";

import { Spacing } from "../../styles/components/Spacing";
import { TextAlign } from "../../styles/components/TextAlign";

import { IApiMessageContainerDetail } from "./interfaces/apiMessageDetail";
import { Flex } from "../../styles/components/Flex";
import Box from "../../component/parts/Box";

export default function MessagesIndex() {
  const apiFetch = useFetch();
  const router = useRouter();

  const [isCautionActive, setIsCautionActive] = useState<boolean>(true);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [messageContainer, setMessageContainer] =
    useState<IApiMessageContainerDetail>();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const apiMessageContainer = await apiFetch<IApiMessageContainerDetail>(
      `messagecontainers/${router.query.id}`,
      true
    );
    setMessageContainer(apiMessageContainer);
  };

  const sendMessage = () => {};

  return (
    <DefaultTemplate>
      <>
        <BoxWrapper display={isCautionActive}>
          <Box
            bgColor="primary"
            paddingH={4}
            paddingV={4}
            isCloseButton={true}
            closeButtonClick={() => setIsCautionActive(false)}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <ReadTitle
                align="left"
                mainColor="white"
                subColor="white"
                main="おゆずりメッセージ中"
                sub="おゆずり成立から7日以内の5/24 16:00 までにメッセージを完了させてください。期日をすぎるとこのメッセージ箱は自動的に閉じられます。"
              />
            </Flex>
          </Box>
        </BoxWrapper>
        <Spacing mt={6}>
          {messageContainer?.messages.map((contents, index) => {
            if (contents.user === "partner") {
              return (
                <OwnMessage
                  key={index}
                  contents={{
                    message: contents.message,
                    createdAt: contents.createdAt,
                  }}
                />
              );
            } else {
              return (
                <PartnerMessage
                  key={index}
                  contents={{
                    message: contents.message,
                    createdAt: contents.createdAt,
                    user: {
                      thumbnailUrl: messageContainer.partner.imageUrl,
                      displayName: messageContainer.partner.displayName,
                      userName: messageContainer.partner.userName,
                    },
                  }}
                />
              );
            }
          })}
        </Spacing>

        <PostButton onClick={() => setIsModalActive(true)}>
          返信を送る
        </PostButton>

        <Shadow isActive={isModalActive} />

        <Modal
          isActive={isModalActive}
          closeAction={() => setIsModalActive(false)}
        >
          <>
            <ReadTitle main="メッセージを送信" />
            <Spacing mt={5} mb={5}>
              <TextArea change={() => console.log("change")} text="" />
            </Spacing>
            <TextAlign align="center">
              <Button
                size="regular"
                margin="0 2px 8px"
                borderColor="primary"
                bgColor="white"
                color="primary"
                click={() => setIsModalActive(false)}
              >
                閉じる
              </Button>
              <Button size="regular" margin="0 2px 8px" click={sendMessage}>
                送信
              </Button>
            </TextAlign>
          </>
        </Modal>
      </>
    </DefaultTemplate>
  );
}

const PostButton = styled.button`
  position: fixed;
  bottom: 72px;
  left: 0;
  width: 100%;
  background-color: ${getColor("thin")};
  border: none;
  padding: 16px;
  color: ${getColor("primary")};
  font-family: "Noto Sans JP", sans-serif;
`;

const BoxWrapper = styled.div`
  display: ${(prop) => (prop.display ? "block" : "none")};
`;
