import React from 'react'
import styled from 'styled-components';
import getColor from '../../../utility/getColor';

type Props = {
  change: (e?: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
  type?: string
}

const Input: React.FC<Props> = ( { change, value, type = 'text' } ) => {
  return <FormParts type={type} onChange={change} placeholder="" value={value} />
}

export default Input

const FormParts = styled.input`
  background-color: ${getColor("disable")};
  padding: 16px;
  width: 100%;
  border: none;
  border-radius: 4px;
  ::placeholder {
    color: ${getColor("primary")};
    font-size: 1.4rem;
    font-family: 'Noto Sans JP', sans-serif;
  }
`;