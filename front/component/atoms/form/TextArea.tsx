import React from 'react'
import styled from 'styled-components';
import getColor from '../../../utility/getColor';

type Props = {
  change: (e?: React.ChangeEvent<HTMLInputElement>) => void,
  text: string
}

const TextArea: React.FC<Props> = ( { change, text } ) => {
  return <FormParts onChange={change} placeholder="このグリーン、とっても素敵でしょう！" rows={5}>{text}</FormParts>
}

export default TextArea

const FormParts = styled.textarea`
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