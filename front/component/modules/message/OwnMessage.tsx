import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import Typography from "../../parts/Typography";
import Box from "../../parts/Box";

import { TextAlign } from "../../../styles/components/TextAlign";

type Props = {
  contents: {
    message: string;
    createdAt: Date;
  };
};
const OwnMessage: React.FC<Props> = ({ contents }) => {
  return (
    <MessageLeft>
      <Box bgColor="secondary" paddingH={3} paddingV={3}>
        <Typography size="regular">
          {contents.message ||
            "メッセージないのでダミーで入れます。メッセージないのでダミーで入れます。メッセージないのでダミーで入れます。"}
        </Typography>
      </Box>
      <TextAlign align="right">
        <Typography family="Inter" size="regular" color="secondary">
          {dayjs(contents.createdAt).format("YYYY-MM-DD HH:mm:ss ddd")}
        </Typography>
      </TextAlign>
    </MessageLeft>
  );
};
export default OwnMessage;

const MessageLeft = styled.div`
  width: 82%;
  margin-left: auto;
  margin-right: 0;
  margin-bottom: 28px;
`;
