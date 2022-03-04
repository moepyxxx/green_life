import React from 'react'
import styled from 'styled-components';
import { IPost } from '../../../pages/posts/interfaces/post';
import TextArea from '../../atoms/form/TextArea';
import SquareButton from '../../molecules/SquareButton';

type Props = {
  post: IPost
  setPost: (post: IPost) => void
}

const CreateStep4: React.FC<Props> = ({ post, setPost }) => {

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