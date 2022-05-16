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

export default function MessagesIndex() {
  const apiFetch = useFetch();
  const router = useRouter();

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
                    displayName: "ユーザー名API含み忘れ",
                    userName: messageContainer.partner.userName,
                  },
                }}
              />
            );
          }
        })}

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
