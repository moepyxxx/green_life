import { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";

import { Spacing } from "../../../../styles/components/Spacing";
import { TextAlign } from "../../../../styles/components/TextAlign";

import Modal from "../../../parts/popup/Modal";
import Shadow from "../../../parts/popup/Shadow";
import Box from "../../../parts/Box";
import Typography from "../../../parts/Typography";
import Button from "../../../parts/Button";
import ReadTitle from "../../common/ReadTitle";

import { PostContext } from "../../../../pages/posts/[id]";
import usePost from "../../../../utility/customhooks/usePost";

const ConfirmField = () => {
  const apiPost = usePost();
  const { oyuzuri } = useContext(PostContext);

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const oyuzuriApprove = async () => {
    if (!oyuzuri) return;
    const result: AxiosResponse | boolean = await apiPost<any, AxiosResponse>(
      `oyuzuris/${oyuzuri._id}/approve`,
      null,
      true
    );

    if (result) {
      console.log("承認しました");
    }
  };

  if (!oyuzuri) return;

  if (oyuzuri.isTargetUser) {
    return (
      <>
        <Box paddingH={4}>
          <TextAlign align="center">
            <ReadTitle
              align="left"
              main="オーナーからの確認"
              sub="オーナーはあなたにおゆずりしたいと思っているようです。メッセージを確認してください。"
            />
            <Button
              size="medium"
              margin="8px 0"
              borderColor="accent"
              bgColor="accent"
              color="white"
              click={() => setIsModalActive(true)}
            >
              メッセージ確認
            </Button>
          </TextAlign>
        </Box>

        <Shadow isActive={isModalActive} />
        <Modal
          isActive={isModalActive}
          closeAction={() => setIsModalActive(false)}
        >
          <>
            <ReadTitle
              align="left"
              main={`メッセージを確認して\nやりとりをしましょう！`}
              sub="オーナーからおゆずりOKが届いています。最終確認メッセージにOKしてやりとりをはじめましょう。やりとりは7日以内に完了させてください。"
            />
            <Box bgColor="thin">
              <Typography size="regular">{oyuzuri.confirmMessage}</Typography>
            </Box>
            <Spacing mt={6}>
              <TextAlign align="center">
                <Button size="medium" click={oyuzuriApprove} bgColor="primary">
                  やりとりをはじめる
                </Button>
              </TextAlign>
            </Spacing>
          </>
        </Modal>
      </>
    );
  } else {
    return (
      <Box paddingH={4}>
        <TextAlign align="center">
          <ReadTitle
            align="left"
            main="募集は締め切られました"
            sub="オーナーの確認中です、しばらくお待ちください。"
          />
        </TextAlign>
      </Box>
    );
  }
};

export default ConfirmField;
