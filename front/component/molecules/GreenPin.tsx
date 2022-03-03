import React from 'react'
import styled from 'styled-components';
import Tree from '../pattern/Tree';

type Props = {
  top: number;
  left: number;
  click: () => void | null;
}
const GreenPin: React.FC<Props> = ( { click, top, left } ) => {

  return (
    click
      ? <ButtonPin onClick={click} top={top.toString()} left={left.toString()}><Tree /></ButtonPin> 
      : <SpanPin onClick={click} top={top.toString()} left={left.toString()}><Tree /></SpanPin> 
  );
}

export default GreenPin

const ButtonPin = styled.button`
  position: absolute;
  display: inline-block;
  z-index: 4;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background-color: #fff;
  border: none;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SpanPin = ButtonPin.withComponent('span');