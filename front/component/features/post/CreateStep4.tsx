import React from 'react'
import styled from 'styled-components';
import { IPost } from '../../../pages/posts/interfaces/post';
import TextArea from '../../atoms/form/TextArea';

type Props = {
  post: IPost
  setPost: (post: IPost) => void
}

const CreateStep4: React.FC<Props> = ({ post, setPost }) => {

  const commentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const comment = e.target.value;
    setPost({ ...post, comment });
  }

  return (
    <>

      <AppealComment>
        <TextArea text={post.comment} change={commentChange} />
      </AppealComment>
      
    </>
  )
}

const AppealComment = styled.div`
  margin: 0;
`;

export default CreateStep4