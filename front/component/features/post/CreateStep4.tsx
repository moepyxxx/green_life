import React from 'react'
import styled from 'styled-components';
import { IPost } from '../../../pages/posts/interfaces/post';
import TextArea from '../../atoms/form/TextArea';
import SquareButton from '../../molecules/SquareButton';

type Props = {
  post: IPost
  setPost: (post: IPost) => void
  executePost: () => void
}

const CreateStep4: React.FC<Props> = ({ post, setPost, executePost }) => {

  const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const comment = e.target.value;
    setPost({ ...post, comment });
  }

  return (
    <>

      <AppealComment>
        <TextArea text={post.comment} change={commentChange} />
        <SquareButton margin="16px 0 0" click={executePost}>この内容で投稿</SquareButton>        
      </AppealComment>
      
    </>
  )
}

const AppealComment = styled.div`
  margin: 0;
`;

export default CreateStep4