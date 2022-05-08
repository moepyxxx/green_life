import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IApiOyuzuri } from "../../../pages/posts/interfaces/apiOyuzuri";
import { IApiOyuzuriRequestUser } from "../../../pages/posts/interfaces/apiPostDetail";
import { Flex } from "../../../styles/components/Flex";
import { Spacing } from "../../../styles/components/Spacing";
import { TextAlign } from "../../../styles/components/TextAlign";
import isUseLogin from "../../../utility/customhooks/isUseLogin";
import usePost from "../../../utility/customhooks/usePost";
import TextArea from "../../atoms/form/TextArea";
import Modal from "../../atoms/Modal";
import Shadow from "../../atoms/Shadow";
import SimpleBox from "../../atoms/SimpleBox";
import Typography from "../../atoms/Typography";
import ProfileCard from "../../molecules/ProfileCard";
import RadiusButton from "../../molecules/RadiusButton";
import SquareButton from "../../molecules/SquareButton";
import OyuzuriParagraph from "./OyuzuriParagraph";

type Props = {
  oyuzuri: IApiOyuzuri;
};
const Oyuzuri: React.FC<Props> = ({ oyuzuri }) => {
  const apiPost = usePost();
  const isLogin = isUseLogin();

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const [isRequestModalActive, setIsRequestModalActive] =
    useState<boolean>(false);
  const [isCancelModalActive, setIsCancelModalActive] =
    useState<boolean>(false);
  const [isOyuzuriTargetModalActive, setIsOyuzuriTargetModalActive] =
    useState<boolean>(false);

  const [requestMessage, setRequestMessage] = useState<string>("");
  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const [currentRequestUser, setCurrentRequestUser] =
    useState<IApiOyuzuriRequestUser | null>(null);

  useEffect(() => {
    setIsModalActive(false);
  }, [isOyuzuriTargetModalActive]);

  const requestMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const comment = e.target.value;
    setRequestMessage(comment);
  };

  const confirmMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const comment = e.target.value;
    setConfirmMessage(comment);
  };

  const showRequestUserMessage = (user: IApiOyuzuriRequestUser) => {
    setIsModalActive(true);
    setCurrentRequestUser(user);
  };

  const oyuzuriRequestUsersComment = () => {
    if (!oyuzuri.isPostMyself) return;

    const noUser =
      oyuzuri.oyuzuriRequestUsers === null ||
      oyuzuri.oyuzuriRequestUsers.length === 0;

    if (noUser) {
      return (
        <Typography size="regular">
          育てたいを教えてくれるユーザーはまだいません。もう少し時間を置いてみましょう。
        </Typography>
      );
    } else {
      return (
        <>
          <Spacing mt={5}>
            <Flex alignItems="flex-start" justifyContent="left">
              {oyuzuri.oyuzuriRequestUsers.map((oyuzuriUser) => {
                return (
                  <UserButton
                    key={oyuzuriUser.userId}
                    onClick={() => showRequestUserMessage(oyuzuriUser)}
                  >
                    <Image
                      unoptimized
                      src={oyuzuriUser.thumbnailUrl}
                      width="400"
                      height="400"
                      objectFit="cover"
                    />
                    <Typography size="small" color="primary" family="Bitter">
                      {oyuzuriUser.userName.slice(0, 6) + "…"}
                    </Typography>
                  </UserButton>
                );
              })}
            </Flex>
          </Spacing>
          <Shadow isActive={isModalActive} />
          <Modal
            isActive={isModalActive}
            closeAction={() => setIsModalActive(false)}
          >
            <>
              {currentRequestUser === null ? (
                <p>無効なリクエストです</p>
              ) : (
                <>
                  <ProfileCard
                    userName={currentRequestUser.userName}
                    displayName={currentRequestUser.displayName}
                    imageUrl={currentRequestUser.thumbnailUrl}
                  />
                  <Spacing mt={4} mb={4}>
                    <SimpleBox>
                      <Typography size="regular">
                        {currentRequestUser.message}
                      </Typography>
                    </SimpleBox>
                  </Spacing>
                  <TextAlign align0="center">
                    <RadiusButton
                      click={() => console.log("link to user profile")}
                      margin="0 0 8px 0"
                      bgColor="white"
                      color="primary"
                      borderColor="primary"
                    >
                      プロフィールを見る
                    </RadiusButton>
                    <RadiusButton
                      click={() => setIsOyuzuriTargetModalActive(true)}
                      bgColor="primary"
                    >
                      おゆずりする
                    </RadiusButton>
                  </TextAlign>
                </>
              )}
            </>
          </Modal>
        </>
      );
    }
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

  const oyuzuriConfirm = async () => {
    const result = await apiPost<
      {
        message: string;
        targetUserId: string;
      },
      boolean
    >(
      `oyuzuris/${oyuzuri._id}/confirm`,
      {
        message: confirmMessage,
        targetUserId: currentRequestUser.userId,
      },
      true
    );

    if (result) {
      setIsOyuzuriTargetModalActive(false);
      console.log("おゆずり確認メッセージが送れました！");
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
      <OyuzuriParagraph oyuzuri={oyuzuri} />

      <Request
        display={oyuzuri.isPostMyself || !isLogin() ? "none" : "display"}
      >
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

      <Shadow
        isActive={
          isCancelModalActive ||
          isRequestModalActive ||
          isOyuzuriTargetModalActive
        }
      />

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

      <Modal
        isActive={isOyuzuriTargetModalActive}
        closeAction={() => setIsOyuzuriTargetModalActive(false)}
      >
        <>
          <Typography color="secondary" weight="bold">
            {currentRequestUser?.displayName || ""}さんへおゆずりする
          </Typography>
          <Typography size="regular" margin="0 0 20px">
            おゆずりOKコメントを送りましょう！このコメントに対して
            {currentRequestUser?.displayName || ""}
            さんが返信をした時点で、やりとりがスタートとなります。
          </Typography>
          <TextArea
            text={confirmMessage}
            placeHolder="おゆずりの最終確認をしましょう"
            change={confirmMessageChange}
          />
          <TextAlign align="center">
            <RadiusButton
              margin="16px 0 8px"
              borderColor="secondary"
              bgColor="white"
              color="secondary"
              click={() => setIsOyuzuriTargetModalActive(false)}
            >
              やっぱりやめる
            </RadiusButton>
            <RadiusButton click={oyuzuriConfirm}>おゆずり決定</RadiusButton>
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

const UserButton = styled.button`
  width: calc(100% / 6);
  border: none;
  padding: 0 8px 4px;
  text-align: center;
`;

export default Oyuzuri;
