import Image from "next/image";
import styled from "styled-components";
import React from "react";
import { Flex } from "../../../../styles/components/Flex";
import { Spacing } from "../../../../styles/components/Spacing";
import Box from "../../../parts/Box";
import Typography from "../../../parts/Typography";
import { IApiOyuzuriRequestUser } from "../../../../pages/posts/interfaces/apiPostDetail";

type Props = {
  user: IApiOyuzuriRequestUser | null;
  click: () => void;
};
const RequestUserCard: React.FC<Props> = ({ user, click }) => {
  if (user) {
    return (
      <Box
        bgColor="white"
        radius={2}
        paddingH={2}
        paddingV={3}
        marginH={2}
        click={click}
      >
        <Flex alignItems="center">
          <Image
            unoptimized
            src={user.thumbnailUrl}
            alt="ユーザー写真"
            width="32"
            height="32"
          />
          <Text>
            <Spacing pl={4}>
              <Flex alignItems="center">
                <Typography size="medium">{user.displayName}</Typography>
                <Typography size="regular" margin="0 0 0 12px">
                  @{user.userName}
                </Typography>
              </Flex>
              <Typography size="regular">
                {user.message.slice(0, 20) + "…"}
              </Typography>
            </Spacing>
          </Text>
        </Flex>
      </Box>
    );
  } else {
    return (
      <Box bgColor="white" radius={2} paddingH={2} paddingV={3} marginH={2}>
        <Typography size="regular">
          リクエストユーザーはまだいません。
        </Typography>
      </Box>
    );
  }
};

const Text = styled.div`
  width: calc(100% - 32px - 16px);
`;

export default RequestUserCard;
