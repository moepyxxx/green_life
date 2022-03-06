import React, { ReactNode } from 'react';
import styled from 'styled-components';
import getColor from '../../utility/getColor';
import Typography from '../atoms/Typography';
import Tree from '../pattern/Tree';

type Props = {
  isActive: boolean
  text: string
}
const Toaster: React.FC<Props> = ( { text, isActive } ) => {
  return (
    <Contents display={isActive ? 'fixed' : 'none'}>
      <IconContents><Tree color="secondary" /></IconContents>
      <TextContents><Typography size="regular">{text}</Typography></TextContents>
    </Contents>
  )
}

export default Toaster

const Contents = styled.div`
  position: fixed;
  display: ${props => props.display};
  width: calc(100% - 32px);
  top: 72px;
  left: 16px:
  z-index: ;
  background-color: ${getColor('gray')};
  border-radius: 4px;
  padding: 20px;
  flex-wrap: wrap;
`;

const IconContents = styled.div`
  width: 40px;

  svg {
    margin: 8px 0;
    width: 70%;
  }
`;

const TextContents = styled.div`
  width: calc(100% - 40px);
`;