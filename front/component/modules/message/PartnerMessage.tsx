import React from "react";
import Image from "next/image";
import styled from "styled-components";
import dayjs from "dayjs";

import Typography from "../../parts/Typography";
import Message from "../../parts/Message";

import { Flex } from "../../../styles/components/Flex";
import { Spacing } from "../../../styles/components/Spacing";
import { TextAlign } from "../../../styles/components/TextAlign";
import TColor from "../../types/color";

type Props = {
  contents: {
    user: {
      thumbnailUrl: string;
      displayName: string;
      userName: string;
    };
    createdAt: Date;
    message: string;
  };
  bgColor?: TColor;
};
const PartnerMessage: React.FC<Props> = ({ contents, bgColor = "white" }) => {
  return (
    <MessageRight>
      <Spacing ml={1} mb={4}>
        <Flex justifyContent="left" alignItems="center">
          <Image
            unoptimized
            src={contents.user.thumbnailUrl}
            width="32"
            height="32"
            alt="ユーザー画像"
            objectFit="cover"
          />
          <Typography margin="0 8px">{contents.user.displayName}</Typography>
        </Flex>
      </Spacing>
      <Message bgColor={bgColor}>
        <Typography size="regular">{contents.message}</Typography>
      </Message>
      <TextAlign align="right">
        <Typography family="Inter" size="regular" color="secondary">
          {dayjs(contents.createdAt).format("YYYY-MM-DD HH:mm:ss ddd")}
        </Typography>
      </TextAlign>
    </MessageRight>
  );
};
export default PartnerMessage;

const MessageRight = styled.div`
  width: 90%;
  margin-bottom: 20px;
`;

const TextSpace = styled.div`
  width: calc(100% - 64px);
  padding-right: 20px;
`;
