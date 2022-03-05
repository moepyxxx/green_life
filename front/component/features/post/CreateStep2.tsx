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
import { IGreenPin, IPost } from '../../../pages/posts/interfaces/post';

type Props = {
  post: IPost
  setPost: (post: IPost) => void
}

const CreateStep2: React.FC<Props> = ({ post, setPost }) => {

  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isPinSelected, setIsPinSelected] = useState<boolean>(false);
  const [greenPins, setGreenPins] = useState<IGreenPin[]>([]);
  const [currentSelectIndex, setCurrentSelectIndex] = useState<number>(0);

  const options = [
    { value: 'g01', label: 'アイビー' },
    { value: 'g02', label: 'ヘチマ' },
    { value: 'g03', label: 'ガジュマル' }
  ];

  const pinSelect = (col: number, row: number) => {

    const rowPer =  Math.floor(100 / 6 * row);
    const colPer = Math.floor(100 / 6 * col);

    const isPinAlreadySelected: boolean = greenPins.some((greenPin: IGreenPin) => {
      return greenPin.position.left === rowPer && greenPin.position.top === colPer;
    });

    if (isPinAlreadySelected) {
      return;
    }

    setGreenPins([...greenPins, {
      position: {
        top: colPer,
        left: rowPer
      },
      greenId: ''
    }])

    setPost({...post, greenPins});
    setIsPinSelected(true);
  }

  const selectGreen = (e: {
    value: string;
    label: string;
  }) => {
    setGreenPins(greenPins.map((greenPin: IGreenPin, index: number) => {
      if (index !== currentSelectIndex) return greenPin;
      return {
        ...greenPin,
        greenId: e.value
      }
    }))

    const greenUnselectedIndex: number | false = greenPins.findIndex((greenPin: IGreenPin) => {
      if (greenPin.greenId === '') return true;
    })

    if (!greenUnselectedIndex) return;
    setCurrentSelectIndex(greenUnselectedIndex);
  }

  return (
    <>
      <IconButton click={() => setIsModalActive(true)}><Typography color="white" weight="bold">?</Typography></IconButton>

      <GreenImage>
        <Image unoptimized src={post.imagePath ? post.imagePath : '/now_loading.png'} alt="サンプル" width="400" height="400" objectFit="cover" />
        <TransParentGrid>
          {[...Array(36)].map((_, index) => {
            const col: number = Math.floor(index / 6 + 1);
            const row: number = index % 6 + 1;
            return <Grid onClick={() => pinSelect(col, row)} />
          })}
        </TransParentGrid>
        {greenPins.map((greenpin: IGreenPin, index: number) => {
          return (
            <GreenPin
              key={index}
              left={greenpin.position.left}
              top={greenpin.position.top}
              click={() => setCurrentSelectIndex(index)}
              isActive={index === currentSelectIndex}
            />
          );
        })}
      </GreenImage>

      <GreenSelect display={isPinSelected ? 'block' : 'none'}>
        <Typography size="regular">植物の名前を教えてね</Typography>
        <Select options={options} onChange={selectGreen} />
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
  display: ${prop => prop.display};
  text-align: left;
  margin-top: 12px;
  padding: 12px;
  background-color: ${getColor("gray")};
  border-radius: 4px;
`;

const TransParentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Grid = styled.span`
  display: inline-block;
  width: calc(100% / 6);
  height: calc(100% / 6);
  background-color: rgba(31, 71, 45, .36);
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

