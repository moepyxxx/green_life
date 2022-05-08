import React, { useState } from "react";
import styled from "styled-components";
import { IApiOyuzuri } from "../../../../pages/posts/interfaces/apiOyuzuri";
import { TextAlign } from "../../../../styles/components/TextAlign";
import useIsLogin from "../../../../utility/customhooks/useIsLogin";
import usePost from "../../../../utility/customhooks/usePost";
import TextArea from "../../../atoms/form/TextArea";
import Modal from "../../../atoms/Modal";
import Shadow from "../../../atoms/Shadow";
import Typography from "../../../atoms/Typography";
import RadiusButton from "../../../molecules/RadiusButton";
import SquareButton from "../../../molecules/SquareButton";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const WantedlyPanel: React.FC<Props> = ({ oyuzuri }) => {
  const apiPost = usePost();
  const isLogin = useIsLogin();

  const [isRequestModalActive, setIsRequestModalActive] =
    useState<boolean>(false);
  const [isCancelModalActive, setIsCancelModalActive] =
    useState<boolean>(false);

  const [requestMessage, setRequestMessage] = useState<string>("");

  const requestMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const comment = e.target.value;
    setRequestMessage(comment);
  };

  const oyuzuriRequest = async () => {
    const result = await apiPost<
      {
        message: string;
      },
      boolean
    >(
      `oyuzuris/${oyuzuri._id}/request`,
      {
        message: requestMessage,
      },
      true
    );

    if (result) {
      setIsRequestModalActive(false);
      console.log("リクエスト送れました！");
    }
  };

  const oyuzuriCancel = async () => {
    const result = await apiPost<{}, boolean>(
      `oyuzuris/${oyuzuri._id}/cancel`,
      {},
      true
    );

    if (result) {
      setIsCancelModalActive(false);
      console.log("リクエストをキャンセルしました！");
    }
  };

  return (
    <>
      <Request display={oyuzuri.isPostMyself || !isLogin ? "none" : "display"}>
        <SquareButton
          click={
            oyuzuri.isRequest === true
              ? () => setIsCancelModalActive(true)
              : () => setIsRequestModalActive(true)
          }
          bgColor={oyuzuri.isRequest === true ? "white" : "secondary"}
          color={oyuzuri.isRequest === true ? "secondary" : "white"}
          borderColor={oyuzuri.isRequest === true ? "secondary" : "secondary"}
        >
          {oyuzuri.isRequest === true ? "キャンセル" : "おゆずりリクエスト"}
        </SquareButton>
        <Typography size="small" margin="8px 0 0">
          OKが出たら、やりとりすることができます
        </Typography>
      </Request>

      <Shadow isActive={isCancelModalActive || isRequestModalActive} />

      <Modal
        isActive={isRequestModalActive}
        closeAction={() => setIsRequestModalActive(false)}
      >
        <>
          <Typography color="secondary" weight="bold">
            おゆずりリクエストを送る
          </Typography>
          <Typography size="regular" margin="0 0 20px">
            おゆずりリクエストを送りましょう！
          </Typography>
          <TextArea
            text={requestMessage}
            placeHolder="おゆずりのお願いやアピールをしましょう"
            change={requestMessageChange}
          />
          <TextAlign align="center">
            <RadiusButton
              margin="16px 0 8px"
              borderColor="secondary"
              bgColor="white"
              color="secondary"
              click={() => setIsRequestModalActive(false)}
            >
              やっぱりやめる
            </RadiusButton>
            <RadiusButton click={oyuzuriRequest}>
              おゆずりリクエスト
            </RadiusButton>
          </TextAlign>
        </>
      </Modal>

      <Modal
        isActive={isCancelModalActive}
        closeAction={() => setIsCancelModalActive(false)}
      >
        <>
          <Typography color="secondary" weight="bold">
            おゆずりリクエストをキャンセル
          </Typography>
          <Typography size="regular" margin="0 0 20px">
            おゆずりリクエストをキャンセルしますがよろしいですか？
            相手へ送ったメッセージも取り消されます。
          </Typography>
          <TextAlign align="center">
            <RadiusButton
              margin="16px 0 8px"
              borderColor="secondary"
              bgColor="white"
              color="secondary"
              click={() => setIsCancelModalActive(false)}
            >
              やっぱりやめる
            </RadiusButton>
            <RadiusButton click={oyuzuriCancel}>キャンセル</RadiusButton>
          </TextAlign>
        </>
      </Modal>
    </>
  );
};

const Request = styled.div`
  display: ${(prop) => prop.display};
  text-align: center;
  margin-top: 32px;
`;

export default WantedlyPanel;
