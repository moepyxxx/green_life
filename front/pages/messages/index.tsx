import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Typography from "../../component/parts/Typography";
import DefaultTemplate from "../../component/templates/Default";
import ReadTitle from "../../component/modules/common/ReadTitle";
import Box from "../../component/parts/Box";

import { TextAlign } from "../../styles/components/TextAlign";
import { Flex } from "../../styles/components/Flex";
import { Spacing } from "../../styles/components/Spacing";
import useFetch from "../../utility/customhooks/useFetch";

import { IApiMessageContainer } from "./interfaces/apiMessage";

export default function MessagesIndex() {
  const apiFetch = useFetch();
  const router = useRouter();

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
        <Spacing mb={6}>
          <ReadTitle main="メッセージ" />
        </Spacing>

        {messageContainers.map((messageContainer, index) => {
          return (
            <Box
              key={index}
              click={() => router.push(`/messages/${messageContainer._id}`)}
              paddingH={4}
              paddingV={4}
              marginH={4}
              radius={3}
            >
              <>
                <Flex alignItems="center" justifyContent="left">
                  <Image
                    unoptimized
                    src={messageContainer.partner.imageUrl}
                    alt="ユーザー画像"
                    width="32"
                    height="32"
                  />
                  <Typography size="medium" margin="0 8px">
                    ユーザー名API含み忘れ
                  </Typography>
                </Flex>
                <Typography size="medium" margin="8px 0">
                  {messageContainer.message
                    ? messageContainer.message.slice(0, 30) + "…"
                    : "メッセージはありません"}
                </Typography>
                <TextAlign align="right">
                  <Typography color="secondary" family="Inter" size="regular">
                    {messageContainer.lastUpdatedAt}
                  </Typography>
                </TextAlign>
              </>
            </Box>
          );
        })}
      </>
    </DefaultTemplate>
  );
}
