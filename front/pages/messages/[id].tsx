import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Typography from "../../component/atoms/Typography";
import DefaultTemplate from "../../component/templates/Default";
import { Spacing } from "../../styles/components/Spacing";
import { TextAlign } from "../../styles/components/TextAlign";
import useFetch from "../../utility/customhooks/useFetch";
import { IApiMessageContainer } from "./interfaces/apiMessage";
import { Flex } from "../../styles/components/Flex";
import { useRouter } from "next/router";
import { IApiMessageContainerDetail } from "./interfaces/apiMessageDetail";
import SimpleBox from "../../component/atoms/SimpleBox";
import getColor from "../../utility/getColor";
import Modal from "../../component/atoms/Modal";
import Shadow from "../../component/atoms/Shadow";
import TextArea from "../../component/atoms/form/TextArea";
import RadiusButton from "../../component/molecules/RadiusButton";

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
                <SimpleBox color="primary">
                  <Typography size="regular" color="white">
                    {m.message}
                  </Typography>
                </SimpleBox>
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
                    <SimpleBox>
                      <Typography size="regular">{m.message}</Typography>
                    </SimpleBox>
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
            <Typography color="secondary" weight="bold">
              メッセージを送信しましょう
            </Typography>
            <Spacing mt={5} mb={5}>
              <TextArea change={() => console.log("change")} text="" />
            </Spacing>
            <TextAlign align="center">
              <RadiusButton
                margin="0 0 8px"
                borderColor="secondary"
                bgColor="white"
                color="secondary"
                click={() => setIsModalActive(false)}
              >
                やっぱりやめる
              </RadiusButton>
              <RadiusButton click={sendMessage}>メッセージ送信</RadiusButton>
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
  background-color: ${getColor("disable")};
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
