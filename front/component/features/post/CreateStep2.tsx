import React, { useState } from 'react'
import Select from 'react-select'
import styled from 'styled-components';
import IconButton from '../../atoms/IconButton';
import Modal from '../../atoms/Modal';
import Shadow from '../../atoms/Shadow';
import Typography from '../../atoms/Typography';
import Image from 'next/image'
import TextBudge from '../../atoms/TextBudge';
import GreenPin from '../../molecules/GreenPin';
import getColor from '../../../utility/getColor';

const CreateStep2: React.FC = () => {

  const [isModalActive, setIsModalActive] = useState<boolean>(false);
 
  const options = [
    { value: 'g01', label: 'アイビー' },
    { value: 'g02', label: 'ヘチマ' },
    { value: 'g03', label: 'ガジュマル' }
  ]

  return (
    <>
      <IconButton click={() => setIsModalActive(true)}><Typography color="white" weight="bold">?</Typography></IconButton>

      <GreenImage>
        <Image src="/sample_1.jpg" alt="サンプル" width="400" height="400" objectFit="cover" />
        <GreenPin left={12} top={60} click={null} />
      </GreenImage>

      <GreenSelect>
        <Typography size="regular">植物の名前を教えてね</Typography>
        <Select options={options} />
      </GreenSelect>

      <Shadow isActive={isModalActive} />

      <Modal isActive={isModalActive} closeAction={() => setIsModalActive(false)}>
        <>
          <Typography color="secondary" weight="bold">グリーンピンの追加方法</Typography>
          <Typography size="regular">グリーンピンを追加することで、画像の中にはどんなグリーンがあるのかを伝えることができます。</Typography>
          <Flex>
            <FlexWrap>
              <TextBudge>step 1</TextBudge>
              <Typography margin="0 0 8px" size="regular">ピンを追加したいところをタップ</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
            <FlexWrap>
              <TextBudge>step 2</TextBudge>
              <Typography margin="0 0 8px" size="regular">グリーン名を検索して登録</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
            <FlexWrap>
              <TextBudge>step 3</TextBudge>
              <Typography margin="0 0 8px" size="regular">グリーン名を検索して登録</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
            <FlexWrap>
              <TextBudge>step 4</TextBudge>
              <Typography margin="0 0 8px" size="regular">必要であれば複数のピンを指定</Typography>
              <Image src="/sample_1.jpg" alt="サンプル" width="300" height="300" objectFit="cover" />
            </FlexWrap>
          </Flex>
        </>
      </Modal>
    </>
  )
}

const GreenImage = styled.div`
  margin-top: 12px;
  position: relative;
  img {
    width: 100%;
  }
`;

const GreenSelect = styled.div`
  text-align: left;
  margin-top: 12px;
  padding: 12px;
  background-color: ${getColor("gray")};
  border-radius: 4px;
`;

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

export default CreateStep2

