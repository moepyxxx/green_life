import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../../../pages/posts/[id]";

import usePost from "../../../../utility/customhooks/usePost";
import TextArea from "../../../parts/form/TextArea";
import Modal from "../../../parts/popup/Modal";
import Shadow from "../../../parts/popup/Shadow";
import Typography from "../../../parts/Typography";
import Button from "../../../parts/Button";
import ReadTitle from "../../common/ReadTitle";
import RequestUserCard from "./RequestUserCard";
import Message from "../../../parts/Message";

import { Spacing } from "../../../../styles/components/Spacing";
import { TextAlign } from "../../../../styles/components/TextAlign";
import { Flex } from "../../../../styles/components/Flex";

import { IApiOyuzuriRequestUser } from "../../../../pages/posts/interfaces/apiPostDetail";
import useToast from "../../../../utility/customhooks/useToast";

const WantedlyField = () => {
  const { oyuzuri, setRefresh } = useContext(PostContext);

  const apiPost = usePost();
  const toast = useToast();

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const [isOyuzuriTargetModalActive, setIsOyuzuriTargetModalActive] =
    useState<boolean>(false);

  const [confirmMessage, setConfirmMessage] = useState<string>("");

  const [currentRequestUser, setCurrentRequestUser] =
    useState<IApiOyuzuriRequestUser | null>(null);

  useEffect(() => {
    setIsModalActive(false);
  }, [isOyuzuriTargetModalActive]);

  const confirmMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const comment = e.target.value;
    setConfirmMessage(comment);
  };

  const showRequestUserMessage = (user: IApiOyuzuriRequestUser) => {
    setIsModalActive(true);
    setCurrentRequestUser(user);
  };

  const oyuzuriRequestUsersComment = () => {
    if (!oyuzuri) return;

    const noUser =
      oyuzuri.oyuzuriRequestUsers == null ||
      oyuzuri.oyuzuriRequestUsers.length === 0;

    if (noUser) {
      return <RequestUserCard user={null} click={() => null} />;
    } else {
      return (
        <>
          {oyuzuri.oyuzuriRequestUsers.map((oyuzuriUser, index) => {
            return (
              <RequestUserCard
                click={() => showRequestUserMessage(oyuzuriUser)}
                user={oyuzuriUser}
                key={index}
              />
            );
          })}
        </>
      );
    }
  };

  const oyuzuriConfirm = async () => {
    if (!oyuzuri) return;

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
      toast({ text: "おゆずり確認メッセージをユーザーへ送信しました。" });
      setRefresh(true);
    }
  };

  const ownderCancel = () => {
    toast({ text: "すみません。その機能はまだありません！" });
  };

  if (!oyuzuri) return;

  return (
    <>
      <Spacing mt={6} mb={2}>
        <Typography size="large" color="white" weight="bold">
          リクエストユーザー一覧
        </Typography>
        {oyuzuriRequestUsersComment()}
        <Spacing mt={5}>
          <TextAlign align="center">
            <Button
              click={ownderCancel}
              bgColor="accent"
              size="medium"
              color="white"
              borderColor="accent"
            >
              おゆずりを取り下げる
            </Button>
          </TextAlign>
        </Spacing>
      </Spacing>

      <Shadow isActive={isOyuzuriTargetModalActive || isModalActive} />

      <Modal
        isActive={isOyuzuriTargetModalActive}
        closeAction={() => setIsOyuzuriTargetModalActive(false)}
      >
        <>
          <ReadTitle
            align="left"
            main="おゆずり決定"
            sub={`おゆずりOKコメントを送りましょう！このコメントに対して${
              currentRequestUser?.displayName || ""
            }さんが返信をした時点で、やりとりがスタートとなります。`}
          />

          <Spacing mt={7} mb={5}>
            <TextArea
              text={confirmMessage}
              placeHolder="おゆずりの最終確認をしましょう"
              change={confirmMessageChange}
            />
          </Spacing>

          <TextAlign align="center">
            <Button
              size="regular"
              margin="0 4px 8px"
              borderColor="primary"
              bgColor="white"
              color="primary"
              click={() => setIsOyuzuriTargetModalActive(false)}
            >
              閉じる
            </Button>
            <Button size="regular" margin="0 4px 8px" click={oyuzuriConfirm}>
              決定
            </Button>
          </TextAlign>
        </>
      </Modal>

      <Modal
        isActive={isModalActive}
        closeAction={() => setIsModalActive(false)}
      >
        <>
          {currentRequestUser === null ? (
            <p>無効なリクエストです</p>
          ) : (
            <>
              <Spacing ml={1}>
                <Flex alignItems="center">
                  <Image
                    unoptimized
                    src={currentRequestUser.thumbnailUrl}
                    width="32"
                    height="32"
                    alt="ユーザー画像"
                  />
                  <Typography size="medium" margin="0 8px">
                    {currentRequestUser.displayName}
                  </Typography>
                  <Typography size="regular" family="Inter" margin="-4px 0 0">
                    @{currentRequestUser.userName}
                  </Typography>
                </Flex>
              </Spacing>
              <Spacing mt={4} mb={8}>
                <Message>{currentRequestUser.message}</Message>
              </Spacing>
              <TextAlign align="center">
                {/* <RadiusButton
                      click={() => console.log("link to user profile")}
                      margin="0 0 8px 0"
                      bgColor="white"
                      color="primary"
                      borderColor="primary"
                    >
                      プロフィールを見る
                    </RadiusButton> */}
                <Button
                  click={() => setIsOyuzuriTargetModalActive(true)}
                  bgColor="primary"
                >
                  おゆずりする
                </Button>
              </TextAlign>
            </>
          )}
        </>
      </Modal>
    </>
  );
};

export default WantedlyField;
