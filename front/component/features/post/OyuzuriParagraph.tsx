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
import getColor from "../../../utility/getColor";
import TextArea from "../../atoms/form/TextArea";
import IconButton from "../../atoms/IconButton";
import Modal from "../../atoms/Modal";
import Shadow from "../../atoms/Shadow";
import SimpleBox from "../../atoms/SimpleBox";
import TextBudge from "../../atoms/TextBudge";
import Typography from "../../atoms/Typography";
import ProfileCard from "../../molecules/ProfileCard";
import RadiusButton from "../../molecules/RadiusButton";
import SquareButton from "../../molecules/SquareButton";
import UnderLineTextButton from "../../molecules/UnderLineTextButton";
import Caution from "../../pattern/Caution";

type Props = {
  oyuzuri: IApiOyuzuri;
  oyuzuriFlag: boolean;
};
const OyuzuriParagraph: React.FC<Props> = ({ oyuzuri, oyuzuriFlag }) => {
  const apiPost = usePost();
  const isLogin = isUseLogin();

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const [isDescriptionModalActive, setIsDescriptionModalActive] =
    useState<boolean>(false);
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

  if (!oyuzuriFlag || !isLogin()) {
    return <></>;
  }

  return (
    <>
      <Gray>
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Typography size="medium" weight="bold">
              おゆずりします！
            </Typography>
            <IconButton click={() => setIsDescriptionModalActive(true)}>
              <Typography color="white" weight="bold">
                ?
              </Typography>
            </IconButton>
          </Flex>
          <Typography size="regular" margin="8px 0 0">
            {oyuzuri.oyuzuriComment}
          </Typography>

          <OyuzuriOwner display={oyuzuri.isPostMyself ? "display" : "none"}>
            <Typography size="medium" weight="bold">
              育てたいを押してくれたユーザーさん
            </Typography>
            {oyuzuriRequestUsersComment()}
            <Spacing mt={5}>
              <Flex alignItems="flex-start" justifyContent="right">
                <Caution />
                <UnderLineTextButton
                  color="danger"
                  click={() => console.log("取り下げる")}
                >
                  おゆずりを取り下げる
                </UnderLineTextButton>
              </Flex>
            </Spacing>
          </OyuzuriOwner>
        </>
      </Gray>

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
          isDescriptionModalActive ||
          isCancelModalActive ||
          isRequestModalActive ||
          isOyuzuriTargetModalActive
        }
      />

      <Modal
        isActive={isDescriptionModalActive}
        closeAction={() => setIsDescriptionModalActive(false)}
      >
        <>
          <Typography color="secondary" weight="bold">
            おゆずり機能について
          </Typography>
          <Typography size="regular">
            ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー
          </Typography>
          <Spacing mt={5}>
            <Flex flexStart="flex-start" alignItems="space-between">
              <FlexWrap>
                <TextBudge>step 1</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
              <FlexWrap>
                <TextBudge>step 2</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
              <FlexWrap>
                <TextBudge>step 3</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
              <FlexWrap>
                <TextBudge>step 4</TextBudge>
                <Typography margin="0 0 8px" size="regular">
                  ほげほげほげ
                </Typography>
                <Image
                  src="/sample_1.jpg"
                  alt="サンプル"
                  width="300"
                  height="300"
                  objectFit="cover"
                />
              </FlexWrap>
            </Flex>
          </Spacing>
        </>
      </Modal>

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

const OyuzuriOwner = styled.div`
  display: ${(prop) => prop.display};
  margin-top: 32px;
`;

const Gray = styled.div`
  margin: 32px 0 0;
  background-color: ${getColor("disable")};
  padding: 16px;
  border-radius: 4px;
`;

const UserButton = styled.button`
  width: calc(100% / 6);
  border: none;
  padding: 0 8px 4px;
  text-align: center;
`;

const FlexWrap = styled.div`
  width: calc(50% - 8px);
  margin-bottom: 16px;
`;

export default OyuzuriParagraph;
