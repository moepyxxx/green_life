import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PostContext } from "../../../../pages/posts/[id]";

import useIsLogin from "../../../../utility/customhooks/useIsLogin";

import usePost from "../../../../utility/customhooks/usePost";
import TextArea from "../../../parts/form/TextArea";
import Modal from "../../../parts/popup/Modal";
import Shadow from "../../../parts/popup/Shadow";
import Button from "../../../parts/Button";
import ReadTitle from "../../common/ReadTitle";

import { TextAlign } from "../../../../styles/components/TextAlign";

const WantedlyField: React.FC = () => {
  const { oyuzuri } = useContext(PostContext);

  const apiPost = usePost();
  const [isLogin] = useIsLogin();

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
    if (!oyuzuri) return;

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
    if (!oyuzuri) return;

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

  if (!oyuzuri) return <></>;

  return (
    <>
      <Request display={oyuzuri.isPostMyself || !isLogin ? "none" : "display"}>
        <Button
          click={
            oyuzuri.isRequest === true
              ? () => setIsCancelModalActive(true)
              : () => setIsRequestModalActive(true)
          }
          bgColor={oyuzuri.isRequest === true ? "white" : "accent"}
          color={oyuzuri.isRequest === true ? "accent" : "white"}
          borderColor={oyuzuri.isRequest === true ? "accent" : "accent"}
        >
          {oyuzuri.isRequest === true ? "リクエスト済み" : "おゆずりリクエスト"}
        </Button>
      </Request>

      <Shadow isActive={isCancelModalActive || isRequestModalActive} />

      <Modal
        isActive={isRequestModalActive}
        closeAction={() => setIsRequestModalActive(false)}
      >
        <>
          <ReadTitle
            main="おゆずりリクエストを送る"
            sub="おゆずりリクエストを送りましょう！"
          />

          <TextArea
            text={requestMessage}
            placeHolder="おゆずりのお願いやアピールをしましょう"
            change={requestMessageChange}
          />
          <TextAlign align="center">
            <Button
              size="regular"
              margin="12px 4px 0"
              borderColor="primary"
              bgColor="white"
              color="primary"
              click={() => setIsRequestModalActive(false)}
            >
              閉じる
            </Button>
            <Button size="regular" margin="12px 4px 0" click={oyuzuriRequest}>
              リクエスト
            </Button>
          </TextAlign>
        </>
      </Modal>

      <Modal
        isActive={isCancelModalActive}
        closeAction={() => setIsCancelModalActive(false)}
      >
        <>
          <ReadTitle
            main="リクエストをキャンセル"
            align="left"
            sub={`おゆずりリクエストをキャンセルしますがよろしいですか？\n相手へ送ったメッセージも取り消されます。`}
            mainColor="primary"
          />

          <TextAlign align="center">
            <Button
              size="regular"
              margin="12px 4px 0"
              borderColor="primary"
              bgColor="white"
              color="primary"
              click={() => setIsCancelModalActive(false)}
            >
              閉じる
            </Button>
            <Button size="regular" margin="12px 4px 0" click={oyuzuriCancel}>
              キャンセル
            </Button>
          </TextAlign>
        </>
      </Modal>
    </>
  );
};

const Request = styled.div`
  display: ${(prop) => prop.display};
  text-align: center;
  margin-top: 20px;
`;

export default WantedlyField;
