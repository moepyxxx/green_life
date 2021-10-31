import React from 'react'
import styled from 'styled-components';
import TColor from '../types/color';
import getColor from '../../utility/getColor';

type Props = {
  fill: TColor
}

const Pattern2: React.FC<Props> = ({ fill = 'primary' }) => {
  return (
    <SvgWrapper>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill={getColor(fill)} d="M51,-60.2C67.1,-47.2,81.9,-32.1,85.8,-14.5C89.6,3.1,82.5,23.3,71.9,41.3C61.3,59.3,47.1,75,29.9,80.6C12.7,86.1,-7.6,81.4,-24.2,72.7C-40.8,63.9,-53.7,51.2,-61.5,36.2C-69.4,21.2,-72.3,4,-71.5,-14.7C-70.7,-33.3,-66.2,-53.4,-53.7,-67.1C-41.1,-80.7,-20.6,-87.9,-1.6,-86.1C17.4,-84.2,34.8,-73.2,51,-60.2Z" transform="translate(100 100)" />
      </svg>
    </SvgWrapper>
  );
}
export default Pattern2

const SvgWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;