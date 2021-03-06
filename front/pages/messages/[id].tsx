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
import getShadow from "../../utility/getShadow";
import usePost from "../../utility/customhooks/usePost";
import useToast from "../../utility/customhooks/useToast";

export default function MessagesIndex() {
  const apiFetch = useFetch();
  const apiPost = usePost();
  const toast = useToast();
  const router = useRouter();

  const [isCautionActive, setIsCautionActive] = useState<boolean>(true);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [messageContainer, setMessageContainer] =
    useState<IApiMessageContainerDetail>();
  const [editingMessage, setEditingMessage] = useState<string>("");

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

  const sendMessage = async () => {
    setIsModalActive(false);
    const result = await apiPost<
      {
        message: string;
        messageContainerId: string;
      },
      boolean
    >(
      "messages",
      {
        message: editingMessage,
        messageContainerId: messageContainer._id,
      },
      true
    );

    if (result) {
      toast({ text: "????????????????????????????????????" });
      initialize();
    }
    setEditingMessage("");
  };

  const onChangeEditingMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message = e.target.value;
    setEditingMessage(message);
  };

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
                main="??????????????????????????????"
                sub="????????????????????????7????????????5/24 16:00 ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
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
          ???????????????
        </PostButton>

        <Shadow isActive={isModalActive} />

        <Modal
          isActive={isModalActive}
          closeAction={() => setIsModalActive(false)}
        >
          <>
            <ReadTitle main="????????????????????????" />
            <Spacing mt={5} mb={5}>
              <TextArea change={onChangeEditingMessage} text={editingMessage} />
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
                ?????????
              </Button>
              <Button size="regular" margin="0 2px 8px" click={sendMessage}>
                ??????
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
  bottom: 88px;
  left: 16px;
  width: calc(100% - 32px);
  background-color: ${getColor("white")};
  display: inline-block;
  border: none;
  border-radius: 16px;
  box-shadow: ${getShadow()};
  padding: 16px;
  color: ${getColor("primary")};
  font-family: "Noto Sans JP", sans-serif;
`;

const BoxWrapper = styled.div`
  display: ${(prop) => (prop.display ? "block" : "none")};
`;
