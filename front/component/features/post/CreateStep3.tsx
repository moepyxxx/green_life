import React from 'react'
import Select from 'react-select'
import styled from 'styled-components';
import { IPost } from '../../../pages/posts/interfaces/post';

type Props = {
  post: IPost
  setPost: (post: IPost) => void
}

const CreateStep3: React.FC<Props> = ({ post, setPost }) => {
 
  const options = [
    { value: 'g01', label: 'アイビー' },
    { value: 'g02', label: 'ヘチマ' },
    { value: 'g03', label: 'ガジュマル' }
  ]

  return (
    <>

      <TagSelect>

       <Select
          isMulti
          name="tags"
          options={options}
        />

      </TagSelect>
      
    </>
  )
}

const TagSelect = styled.div`
  margin: 0;
`;

export default CreateStep3