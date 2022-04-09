import Image from 'next/image';
import React, { useState } from 'react'
import styled from 'styled-components';
import { IApiOyuzuriRequestUser } from '../../../pages/posts/interfaces/apiPostDetail';
import getColor from '../../../utility/getColor';
import IconButton from '../../atoms/IconButton';
import Modal from '../../atoms/Modal';
import Shadow from '../../atoms/Shadow';
import TextBudge from '../../atoms/TextBudge';
import Typography from '../../atoms/Typography';
import SquareButton from '../../molecules/SquareButton';
import UnderLineTextButton from '../../molecules/UnderLineTextButton';
import Caution from '../../pattern/Caution';

export type TOyuzuriParagraph = {
  oyuzuriFlag: boolean;
  comment: string;
  isPostMyself: boolean;
  oyuzuriRequestUsers: IApiOyuzuriRequestUser[] | null;
  oyuzuriRequest: boolean | null;
  oyuzuriId: string | null;
}

type Props = {
  paragraph: TOyuzuriParagraph,
  oyuzuriRequest: () => void
}
const OyuzuriParagraph: React.FC<Props> = ({ paragraph, oyuzuriRequest }) => {

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const oyuzuriRequestUsersComment = () => {

    const noUser = paragraph.oyuzuriRequestUsers === null || paragraph.oyuzuriRequestUsers.length === 0;

    if (noUser) {
      return (
        <Typography size="regular">育てたいを教えてくれるユーザーはまだいません。もう少し時間を置いてみましょう。</Typography>
      );
    } else {
      return (
        <FlexLeft>
          {paragraph.oyuzuriRequestUsers.map(user => {
            return (
              <UserButton key={user._id} onClick={() => console.log('hoge')}>
                <Image unoptimized src={user.imageUrl} width="400" height="400" objectFit="cover" />
                <Typography size="small" color="primary" family="Bitter">{user.userName.slice(0, 6) + '…'}</Typography>
              </UserButton>
            )
          })}
        </FlexLeft>
      )
    }
  }

  if (!paragraph.oyuzuriFlag) {
    return <></>;
  }

  return (
    <>
      <Gray>
        <>
          <FlexJustify>
            <Typography size="medium" weight="bold">おゆずりします！</Typography>
            <IconButton
              click={() => setIsModalActive(true)}
            >
              <Typography color="white" weight="bold">?</Typography>
            </IconButton>
          </FlexJustify>
          <Typography size="regular" margin="8px 0 0">{paragraph.comment}</Typography>

          <OyuzuriOwner display={paragraph.isPostMyself ? 'display' : 'none'}>
            <Typography size="medium" weight="bold">育てたいを押してくれたユーザーさん</Typography>
            {oyuzuriRequestUsersComment()}
            <RightAlign>
              <Caution />
              <UnderLineTextButton color="danger" click={() => console.log('取り下げる')}>おゆずりを取り下げる</UnderLineTextButton>
            </RightAlign>
          </OyuzuriOwner>
        </>
      </Gray>

      <Request display={paragraph.isPostMyself ? 'none' : 'display'}>
        <SquareButton isDisable={paragraph.oyuzuriRequest === true} click={oyuzuriRequest}>育てたい</SquareButton>
        <Typography size="small" margin="8px 0 0">OKが出たら、やりとりすることができます</Typography>
      </Request>


      <Shadow isActive={isModalActive} />

      <Modal isActive={isModalActive} closeAction={() => setIsModalActive(false)}>
        <>
          <Typography color="secondary" weight="bold">おゆずり機能について</Typography>
          <Typography size="regular">ダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミーダミー</Typography>
          <Flex>
            <FlexWrap>
              <TextBudge>step 1</TextBudge>
              <Typography margin="0 0 8px" size="regular">ほげほげほげ</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
            <FlexWrap>
              <TextBudge>step 2</TextBudge>
              <Typography margin="0 0 8px" size="regular">ほげほげほげ</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
            <FlexWrap>
              <TextBudge>step 3</TextBudge>
              <Typography margin="0 0 8px" size="regular">ほげほげほげ</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
            <FlexWrap>
              <TextBudge>step 4</TextBudge>
              <Typography margin="0 0 8px" size="regular">ほげほげほげ</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
          </Flex>
        </>
      </Modal>
    </>
  )
}

const Request = styled.div`
  display: ${prop => prop.display};
  text-align: center;
  margin-top: 32px;
`;

const OyuzuriOwner = styled.div`
  display: ${prop => prop.display};
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

export default OyuzuriParagraph

