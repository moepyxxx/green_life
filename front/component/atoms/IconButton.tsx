import React, { ReactChild } from 'react'
import styled from 'styled-components';
import Pattern1 from '../pattern/Pattern1'
import TColor from '../types/color'

type Props = {
  fill?: TColor,
  children: ReactChild
  click: () => void
}

const IconButton: React.FC<Props> = ( { fill = 'primary', children , click } ) => {
  return (
    <Button onClick={click}>
      <WrapPattern>
        <Pattern1 fill={fill} />        
      </WrapPattern>
      <WrapIcon>
        {children}
      </WrapIcon>
    </Button>
  )
}

export default IconButton

const Button = styled.button`
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
`;