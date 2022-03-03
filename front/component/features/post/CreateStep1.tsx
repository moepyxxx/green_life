import React, { useState } from 'react'
import styled from 'styled-components';
import IconButton from '../../atoms/IconButton';
import Modal from '../../atoms/Modal';
import Shadow from '../../atoms/Shadow';
import Typography from '../../atoms/Typography';
import SquareButton from '../../molecules/SquareButton';
import Image from 'next/image'

const CreateStep1: React.FC = () => {

  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  
  return (
    <>
      <SquareButton click={() => console.log('hoge')}>ここへ選択してね</SquareButton>
      <Typography color="disable" size="small" margin="8px 0 16px">ドラッグ＆ドロップもしくはクリックで選択</Typography>
      <IconButton click={() => setIsModalActive(true)}><Typography color="white" weight="bold">?</Typography></IconButton>

      <Shadow isActive={isModalActive} />

      <Modal isActive={isModalActive} closeAction={() => setIsModalActive(false)}>
        <>
          <Typography color="secondary" weight="bold">写真に関する注意点</Typography>
          <Typography size="regular">greenLifeのチームがみんなで楽しく写真を見られるように、写真にはいくつかのご遠慮ルールが存在します。</Typography>
          <Flex>
            <FlexWrap>
              <Typography margin="0 0 8px" size="regular">ぼやけたグリーンたちの写真</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
            <FlexWrap>
              <Typography margin="0 0 8px" size="regular">ヒトがメインの写真</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
            <FlexWrap>
              <Typography margin="0 0 8px" size="regular">グリーン以外の写真</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
          </Flex>
        </>
      </Modal>
    </>
  )
}

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 20px;
`;

const FlexWrap = styled.div`
  width: calc(50% - 8px);
  margin-bottom: 16px;
`;


export default CreateStep1

