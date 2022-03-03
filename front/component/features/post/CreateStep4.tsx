import React from 'react'
import Select from 'react-select'
import styled from 'styled-components';
import TextArea from '../../atoms/form/TextArea';
import SquareButton from '../../molecules/SquareButton';

const CreateStep4: React.FC = () => {

  return (
    <>

      <AppealComment>
        <TextArea />
        <SquareButton margin="16px 0 0" click={() => console.log('hoge')}>この内容で投稿</SquareButton>        
      </AppealComment>
      
    </>
  )
}

const AppealComment = styled.div`
  margin: 0;
`;

export default CreateStep4