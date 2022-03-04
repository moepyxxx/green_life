import React, { ReactChild } from 'react'
import styled from 'styled-components';
import getColor from '../../utility/getColor';
import Pattern1 from '../pattern/Pattern1'
import TColor from '../types/color'

type Props = {
  fill?: TColor
  color?: TColor
  children: ReactChild
  click: () => void | null
}

const IconButton: React.FC<Props> = ( { fill = 'primary', color='font', children , click } ) => {

  const wrapper = (
    <>
      <WrapPattern>
        <Pattern1 fill={fill} />        
      </WrapPattern>
      <WrapIcon color={color}>
        {children}
      </WrapIcon>
    </>
  );

  if (click === null) {
    return (
      <Span>
        {wrapper}
      </Span>
    )
  } else {
    return (
      <Button onClick={click}>
        {wrapper}
      </Button>
    )
  }
}

export default IconButton

const Button = styled.button`
  width: 52px;
  height: 52px;
  background: transparent;
  border: none;
  position: relative;
`;
const Span = styled.span`
  width: 52px;
  height: 52px;
  background: transparent;
  border: none;
  position: relative;
`;

const WrapPattern = styled.div`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const WrapIcon = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img, svg {
    vertical-align: middle;
  }
  color: ${prop => getColor(prop.color)};
`;