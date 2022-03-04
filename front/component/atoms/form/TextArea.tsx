import React from 'react'
import styled from 'styled-components';
import getColor from '../../../utility/getColor';

type Props = {

}

const TextArea: React.FC<Props> = ( {  } ) => {
  return <FormParts placeholder="このグリーン、とっても素敵でしょう！" rows={5} />
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