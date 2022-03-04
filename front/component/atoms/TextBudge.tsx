import React, { ReactChild } from 'react'
import styled from 'styled-components';
import getColor from '../../utility/getColor';
import TColor from '../types/color';

type Props = {
  color?: TColor;
  bgColor?: TColor;
  children: ReactChild;
}

const TextBudge: React.FC<Props> = ( { color = "white", children, bgColor = "primary" } ) => {
  return (
    <>
      <Budge color={color} bgColor={bgColor}>
        {children}
      </Budge>
    </>
  )
}

export default TextBudge

const Budge = styled.div`
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  font-size: 1.2rem;
  border-radius: 8px;
  padding: 2px 8px;
`;