import React, { ReactChild } from 'react'
import styled from 'styled-components';
import getColor from '../../utility/getColor';

type Props = {
  children: ReactChild;
}

const SimpleBox: React.FC<Props> = ( { children } ) => {

  return (
    <Box>{children}</Box>
  )
}

export default SimpleBox

const Box = styled.div`
  border-radius: 4px;
  padding: 20px;
  background-color: ${getColor('disable')};
`;