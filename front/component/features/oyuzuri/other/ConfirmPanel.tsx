import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { IApiOyuzuri } from "../../../../pages/posts/interfaces/apiOyuzuri";
import { Spacing } from "../../../../styles/components/Spacing";
import { TextAlign } from "../../../../styles/components/TextAlign";
import usePost from "../../../../utility/customhooks/usePost";
import Modal from "../../../atoms/Modal";
import Shadow from "../../../atoms/Shadow";
import SimpleBox from "../../../atoms/SimpleBox";
import Typography from "../../../atoms/Typography";
import RadiusButton from "../../../molecules/RadiusButton";
import SquareButton from "../../../molecules/SquareButton";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const ConfirmPanel: React.FC<Props> = ({ oyuzuri }) => {
  const apiPost = usePost();

  const [isConfirmModalActive, setIsConfirmModalActive] =
    useState<boolean>(false);

  const oyuzuriApprove = async () => {
    const result: AxiosResponse | boolean = await apiPost<any, AxiosResponse>(
      `oyuzuris/${oyuzuri._id}/approve`,
      null,
      true
    );

    if (result) {
      console.log("承認しました");
    }
  };

  if (oyuzuri.isTargetUser) {
    return (
      <TextAlign align="center">
        <Typography size="regular" margin="24px 0 0">
          オーナーがあなたへおゆずりOKしています！
        </Typography>
        <SquareButton
          margin="8px 0"
          borderColor="secondary"
          bgColor="secondary"
          color="white"
          click={() => setIsConfirmModalActive(true)}
        >
          オーナーからのメッセージを確認
        </SquareButton>

        <Shadow isActive={isConfirmModalActive} />
        <Modal
          isActive={isConfirmModalActive}
          closeAction={() => setIsConfirmModalActive(false)}
        >
          <>
            <Typography size="large" color="secondary">
              メッセージを確認して
            </Typography>
            <Typography size="large" color="secondary">
              やりとりをはじめましょう！
            </Typography>
            <Typography margin="16px 0" size="regular">
              オーナーからおゆずりOKが届いています。最終確認メッセージにOKしてやりとりをはじめましょう。やりとりは7日以内に完了させてください。
            </Typography>
            <SimpleBox>
              <Typography size="regular">{oyuzuri.confirmMessage}</Typography>
            </SimpleBox>
            <Spacing mt={6}>
              <TextAlign align="center">
                <RadiusButton click={oyuzuriApprove} bgColor="primary">
                  やりとりをはじめる
                </RadiusButton>
              </TextAlign>
            </Spacing>
          </>
        </Modal>
      </TextAlign>
    );
  } else {
    return (
      <TextAlign align="center">
        <Typography size="regular">この募集は締め切られました。</Typography>
        <Typography size="regular">オーナーの確認中です</Typography>
      </TextAlign>
    );
  }
};

export default ConfirmPanel;
