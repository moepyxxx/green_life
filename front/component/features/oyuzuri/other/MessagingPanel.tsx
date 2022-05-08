import router from "next/router";
import React from "react";
import { IApiOyuzuri } from "../../../../pages/posts/interfaces/apiOyuzuri";
import { TextAlign } from "../../../../styles/components/TextAlign";
import Typography from "../../../atoms/Typography";
import SquareButton from "../../../molecules/SquareButton";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const MessagingPanel: React.FC<Props> = ({ oyuzuri }) => {
  const linkToMessage = () => {
    router.push(`/messages/${oyuzuri.messageContainerId}`);
  };

  if (!oyuzuri.isRequest) {
    return;
  }

  if (oyuzuri.isTargetUser) {
    return (
      <TextAlign align="center">
        <Typography size="regular" margin="24px 0 0">
          オーナーとやりとりをしています
        </Typography>
        <SquareButton
          margin="8px 0"
          borderColor="secondary"
          bgColor="secondary"
          color="white"
          click={linkToMessage}
        >
          最新のメッセージを確認
        </SquareButton>
      </TextAlign>
    );
  } else {
    return (
      <TextAlign align="center">
        <Typography size="regular">おゆずりリクエスト過多につき</Typography>
        <Typography size="regular">今回は選ばれませんでした</Typography>
      </TextAlign>
    );
  }
};

export default MessagingPanel;
