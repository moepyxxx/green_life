import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { IApiOyuzuri } from "../../../../pages/posts/interfaces/apiOyuzuri";
import { Flex } from "../../../../styles/components/Flex";
import Typography from "../../../atoms/Typography";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const ConfirmPanel: React.FC<Props> = ({ oyuzuri }) => {
  return (
    <>
      <OyuzuriOwner display={oyuzuri.isPostMyself ? "display" : "none"}>
        <Typography size="medium" weight="bold">
          育てたいユーザーさんへメッセージ中
        </Typography>
        <Typography size="regular">
          返信があるまで少々お待ちください。
        </Typography>
        <Flex alignItems="flex-start" justifyContent="left">
          <UserButton key={oyuzuri.oyuzuriTargetUser.userId}>
            <Image
              unoptimized
              src={oyuzuri.oyuzuriTargetUser.thumbnailUrl}
              alt="ユーザー画像"
              width="400"
              height="400"
              objectFit="cover"
            />
            <Typography size="small" color="primary" family="Bitter">
              {oyuzuri.oyuzuriTargetUser.userName.slice(0, 6) + "…"}
            </Typography>
          </UserButton>
        </Flex>
      </OyuzuriOwner>
    </>
  );
};

const OyuzuriOwner = styled.div`
  display: ${(prop) => prop.display};
  margin-top: 32px;
`;

const UserButton = styled.button`
  width: calc(100% / 6);
  border: none;
  padding: 0 8px 4px;
  text-align: center;
  background: none;
  margin-top: 16px;
`;

export default ConfirmPanel;
