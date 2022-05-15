import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Typography from "../../component/parts/Typography";
import DefaultTemplate from "../../component/templates/Default";
import { TextAlign } from "../../styles/components/TextAlign";
import useFetch from "../../utility/customhooks/useFetch";
import { IApiMessageContainer } from "./interfaces/apiMessage";
import { Flex } from "../../styles/components/Flex";

export default function MessagesIndex() {
  const apiFetch = useFetch();

  const [messageContainers, setMessageContainer] = useState<
    IApiMessageContainer[]
  >([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const messages = await apiFetch<IApiMessageContainer[]>(
      "messagecontainers",
      true
    );
    setMessageContainer(messages);
  };
  return (
    <DefaultTemplate>
      <>
        <TextAlign align="center">
          <Typography size="large" weight="bold" margin="0 0 28px">
            メッセージ
          </Typography>
        </TextAlign>

        {messageContainers.map((messageContainer, index) => {
          return (
            <Message key={index} href={`/messages/${messageContainer._id}`}>
              <Flex alignItems="center" justifyContent="space-between">
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
                    family="Inter"
                  >
                    {messageContainer.partner.userName.slice(0, 6) + "…"}
                  </Typography>
                </IconSpace>
                <TextSpace>
                  <Typography size="regular" weight="bold" family="Inter">
                    {messageContainer.lastUpdatedAt}
                  </Typography>
                  <Typography size="medium">
                    {messageContainer.message.slice(0, 15) + " …"}
                  </Typography>
                </TextSpace>
              </Flex>
            </Message>
          );
        })}
      </>
    </DefaultTemplate>
  );
}

const Message = styled.a`
  width: 100%;
  display: inline-block;
  padding: 12px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;

const IconSpace = styled.div`
  width: 64px;
  padding-right: 16px;
`;

const TextSpace = styled.div`
  width: calc(100% - 64px);
  padding-right: 20px;
`;
