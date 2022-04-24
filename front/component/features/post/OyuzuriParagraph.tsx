import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IApiOyuzuriRequestUser } from "../../../pages/posts/interfaces/apiPostDetail";
import useFetch from "../../../utility/customhooks/useFetch";
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

export type TOyuzuriParagraph = {
  oyuzuriFlag: boolean;
  comment: string;
  isPostMyself: boolean;
  oyuzuriRequestUsers: IApiOyuzuriRequestUser[] | null;
  oyuzuriRequest: boolean | null;
  oyuzuriId: string | null;
};

type Props = {
  paragraph: TOyuzuriParagraph;
  oyuzuriId: string;
};
const OyuzuriParagraph: React.FC<Props> = ({ paragraph, oyuzuriId }) => {
  const apiPost = usePost();

  const [isDescriptionModalActive, setIsDescriptionModalActive] =
    useState<boolean>(false);
  const [isRequestModalActive, setIsRequestModalActive] =
    useState<boolean>(false);
  const [isCancelModalActive, setIsCancelModalActive] =
    useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<string>("");
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [currentRequestUser, setCurrentRequestUser] =
    useState<IApiOyuzuriRequestUser | null>(null);

  const requestMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const comment = e.target.value;
    setRequestMessage(comment);
  };

  const showRequestUserMessage = (user: IApiOyuzuriRequestUser) => {
    setIsModalActive(true);
    setCurrentRequestUser(user);
  };

  const oyuzuriRequestUsersComment = () => {
    const noUser =
      paragraph.oyuzuriRequestUsers === null ||
      paragraph.oyuzuriRequestUsers.length === 0;

    if (noUser) {
      return (
        <Typography size="regular">
          育てたいを教えてくれるユーザーはまだいません。もう少し時間を置いてみましょう。
        </Typography>
      );
    } else {
      return (
        <>
          <FlexLeft>
            {paragraph.oyuzuriRequestUsers.map((oyuzuriUser) => {
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
          </FlexLeft>
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
                  <Margin>
                    <SimpleBox>
                      <Typography size="regular">
                        {currentRequestUser.message}
                      </Typography>
                    </SimpleBox>
                  </Margin>
                  <Center>
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
                      click={() => console.log("oyuzuri!")}
                      bgColor="primary"
                    >
                      おゆずりする
                    </RadiusButton>
                  </Center>
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
      `oyuzuris/${oyuzuriId}/request`,
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
      `oyuzuris/${oyuzuriId}/cancel`,
      {},
      true
    );

    if (result) {
      setIsCancelModalActive(false);
      console.log("リクエストをキャンセルしました！");
    }
  };

  if (!paragraph.oyuzuriFlag) {
    return <></>;
  }

  return (
    <>
      <Gray>
        <>
          <FlexJustify>
            <Typography size="medium" weight="bold">
              おゆずりします！
            </Typography>
            <IconButton click={() => setIsDescriptionModalActive(true)}>
              <Typography color="white" weight="bold">
                ?
              </Typography>
            </IconButton>
          </FlexJustify>
          <Typography size="regular" margin="8px 0 0">
            {paragraph.comment}
          </Typography>

          <OyuzuriOwner display={paragraph.isPostMyself ? "display" : "none"}>
            <Typography size="medium" weight="bold">
              育てたいを押してくれたユーザーさん
            </Typography>
            {oyuzuriRequestUsersComment()}
            <RightAlign>
              <Caution />
              <UnderLineTextButton
                color="danger"
                click={() => console.log("取り下げる")}
              >
                おゆずりを取り下げる
              </UnderLineTextButton>
            </RightAlign>
          </OyuzuriOwner>
        </>
      </Gray>

      <Request display={paragraph.isPostMyself ? "none" : "display"}>
        <SquareButton
          click={
            paragraph.oyuzuriRequest === true
              ? () => setIsCancelModalActive(true)
              : () => setIsRequestModalActive(true)
          }
          bgColor={paragraph.oyuzuriRequest === true ? "white" : "secondary"}
          color={paragraph.oyuzuriRequest === true ? "secondary" : "white"}
          borderColor={
            paragraph.oyuzuriRequest === true ? "secondary" : "secondary"
          }
        >
          {paragraph.oyuzuriRequest === true
            ? "キャンセル"
            : "おゆずりリクエスト"}
        </SquareButton>
        <Typography size="small" margin="8px 0 0">
          OKが出たら、やりとりすることができます
        </Typography>
      </Request>

      <Shadow
        isActive={
          isDescriptionModalActive ||
          isCancelModalActive ||
          isRequestModalActive
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
          <Flex>
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
          <Center>
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
          </Center>
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
          <Center>
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
          </Center>
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

const RightAlign = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 20px;
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

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 20px;
`;

const FlexLeft = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: left;
  margin-top: 20px;
`;

const FlexWrap = styled.div`
  width: calc(50% - 8px);
  margin-bottom: 16px;
`;

const FlexJustify = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Center = styled.div`
  text-align: center;
`;

const Margin = styled.div`
  margin: 16px 0;
`;

export default OyuzuriParagraph;
