import React, { useState } from 'react'
import styled from 'styled-components';
import Image from 'next/image'
import getColor from '../../utility/getColor';
import Typography from '../atoms/Typography';

type Props = {
  isPlantVisualActive: boolean;
}
const SwitchingGreenImage: React.FC<Props> = ({ isPlantVisualActive = false }) => {

  type TPlant = {
    imagePath: string,
    name: string,
    description: string,
    cordinate: {
      top: number,
      left: number
    }
  }

  const damies: TPlant[] = [{
    imagePath: 'sample_1.jpg',
    name: 'リキュウソウ',
    description: 'ここにちょっとした説明が入るここにちょっとした説明が入るここにちょっとした説明が入る',
    cordinate: {
      top: 40,
      left: 40
    }
  }, {
    imagePath: 'sample_2.jpg',
    name: 'ホゲソウ',
    description: 'ここにちょっとした説明が入る',
    cordinate: {
      top: 120,
      left: 240
    }
  }];

  const [modalText, setModalText] = useState<TPlant>(damies[0]);
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);

  const openPlantDescription = (index: number) => {
    setModalText(damies[index]);
    setModalIsActive(true);
  }

  return (
    <MainImage>
      <Image src="/sample_1.jpg" width="500" height="500" objectFit='cover' alt="グリーン画像" />
      <PlantVisual isActive={isPlantVisualActive}>
        <Shadow />

        {damies.map((damy, index) => {
          return  <Pin top={damy.cordinate.top} left={damy.cordinate.top} onClick={() => openPlantDescription(index)} />
        })}

        <PlantDescriptionModal isActive={modalIsActive}>
          <CloseIcon onClick={() => setModalIsActive(false)} />
          <Image src={`/${modalText.imagePath}`} width="72" height="72" objectFit='cover' alt="グリーン画像" />
          <Typography size="medium" color="secondary">{modalText.name}</Typography>
          <Typography size="small">{modalText.description}</Typography>
        </PlantDescriptionModal>

      </PlantVisual>

    </MainImage>
  );
}

export default SwitchingGreenImage

const MainImage = styled.div`
  position: relative;
  width: 100%;
`;

const PlantVisual = styled.div`
  display: ${(props) => props.isActive ? 'block' : 'none'};
  width: 100%;
`;

const Shadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(31, 71, 45, .36);
`;

const Pin = styled.button`
  position: absolute;
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background-color: #fff;
  border: none;

  &:after {
    content: '?';
    color: ${getColor('secondary')};
    font-size: 1.8rem;
    font-family: 'Bitter', sans-serif;
  }
`;

const PlantDescriptionModal = styled.div`
  display: ${(props) => props.isActive ? 'block' : 'none'};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-color: #fff;
  padding: 32px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .25);
`;

const CloseIcon = styled.span`
  position: absolute;
  top: -4%;
  right: -4%;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${getColor('secondary')};
  border: 1px solid #fff;

  &:after {
    content: '×';
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;