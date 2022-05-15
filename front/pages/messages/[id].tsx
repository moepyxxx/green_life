import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Typography from "../../component/parts/Typography";
import DefaultTemplate from "../../component/templates/Default";
import { Spacing } from "../../styles/components/Spacing";
import { TextAlign } from "../../styles/components/TextAlign";
import useFetch from "../../utility/customhooks/useFetch";
import { Flex } from "../../styles/components/Flex";
import { useRouter } from "next/router";
import { IApiMessageContainerDetail } from "./interfaces/apiMessageDetail";
import Box from "../../component/parts/Box";
import getColor from "../../utility/getColor";
import Modal from "../../component/parts/popup/Modal";
import Shadow from "../../component/parts/popup/Shadow";
import TextArea from "../../component/parts/form/TextArea";
import Button from "../../component/parts/Button";

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
        {messageContainer?.messages.map((m, index) => {
          if (m.user === "partner") {
            return (
              <MessageLeft key={index}>
                <Box bgColor="primary">
                  <Typography size="regular" color="white">
                    {m.message}
                  </Typography>
                </Box>
              </MessageLeft>
            );
          } else {
            return (
              <MessageRight key={index}>
                <Flex justifyContent="right" alignItems="flex-start">
                  <IconSpace>
                    <Image
                      unoptimized
                      src={messageContainer.partner.imageUrl}
                      width="200"
                      height="200"
                      alt="ユーザー画像"
                      objectFit="cover"
                    />
                    <Typography
                      size="small"
                      color="primary"
                      margin="-8px 0 0"
                      family="Bitter"
                    >
                      {messageContainer.partner.userName.slice(0, 6) + "…"}
                    </Typography>
                  </IconSpace>
                  <TextSpace>
                    <Box>
                      <Typography size="regular">{m.message}</Typography>
                    </Box>
                  </TextSpace>
                </Flex>
              </MessageRight>
            );
          }
        })}

        <PostButton onClick={() => setIsModalActive(true)}>
          返信を送信する
        </PostButton>

        <Shadow isActive={isModalActive} />

        <Modal
          isActive={isModalActive}
          closeAction={() => setIsModalActive(false)}
        >
          <>
            <Typography weight="bold">メッセージを送信しましょう</Typography>
            <Spacing mt={5} mb={5}>
              <TextArea change={() => console.log("change")} text="" />
            </Spacing>
            <TextAlign align="center">
              <Button
                margin="0 0 8px"
                borderColor="primary"
                bgColor="white"
                color="primary"
                click={() => setIsModalActive(false)}
              >
                やっぱりやめる
              </Button>
              <Button margin="0 0 8px" click={sendMessage}>
                メッセージ送信
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

const MessageRight = styled.div`
  width: 90%;
  margin-bottom: 20px;
`;

const MessageLeft = styled.div`
  width: 82%;
  margin-left: auto;
  margin-right: 0;
  margin-bottom: 20px;
`;

const IconSpace = styled.div`
  width: 64px;
  padding-right: 16px;
`;

const TextSpace = styled.div`
  width: calc(100% - 64px);
  padding-right: 20px;
`;
