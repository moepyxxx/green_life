import React, { ReactChild } from 'react'
import styled from 'styled-components';

type Props = {
  children: ReactChild
}

const Label: React.FC<Props> = ( { children } ) => {
  return (
    <FormParts>{children}</FormParts>
  );
}

export default Label

const FormParts = styled.label`
  font-size: 1.6rem;
`;