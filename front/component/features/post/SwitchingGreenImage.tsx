import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Image from 'next/image'
import getColor from '../../../utility/getColor';
import Typography from '../../atoms/Typography';
import Shadow from '../../atoms/Shadow';
import Modal from '../../atoms/Modal';
import GreenPin from '../../molecules/GreenPin';

export type TGreenPin = {
  green: {
    name: string,
    description: string,
    imagePath: string
  },
  position: {
    left: number,
    top: number
  }
}

type Props = {
  isPlantVisualActive: boolean;
  greenPins: TGreenPin[];
  imagePath: string;
}
const SwitchingGreenImage: React.FC<Props> = ({ isPlantVisualActive, greenPins, imagePath }) => {

  const [modalText, setModalText] = useState<TGreenPin>(greenPins[0]);
  const [modalIsActive, setModalIsActive] = useState<boolean>(false);
  
  const openPlantDescription = (index: number) => {
    setModalText(greenPins[index]);
    setModalIsActive(true);
  }

  return (
    <MainImage>
      <Image unoptimized src={imagePath} width="500" height="500" objectFit='cover' alt="グリーン画像" />
      <PlantVisual isActive={isPlantVisualActive}>

        <Shadow isActive={isPlantVisualActive} position="absolute" />

        {greenPins.map((greepin, index) => {
          return  (
            <GreenPin
              key={index}
              top={greepin.position.top}
              left={greepin.position.left}
              click={() => openPlantDescription(index)}
            />
          );
        })}
        
        <Modal isActive={modalIsActive} closeAction={() => setModalIsActive(false)} position="absolute">
          <ModalInner>
            <Image
              src={`/${modalText.green.imagePath}`}
              width="72"
              height="72"
              objectFit='cover'
              alt="グリーン画像"
            />
            <Typography size="medium" color="secondary">{modalText.green.name}</Typography>
            <Typography size="small">{modalText.green.description}</Typography>
          </ModalInner>
        </Modal>

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

const ModalInner = styled.div`
  text-align: center;
`;