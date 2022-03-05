import React from 'react'
import Select, { ActionMeta, MultiValue } from 'react-select'
import styled from 'styled-components';
import { IPost } from '../../../pages/posts/interfaces/post';

type Props = {
  post: IPost
  setPost: (post: IPost) => void
}

const CreateStep3: React.FC<Props> = ({ post, setPost }) => {
 
  const change = (newTags: MultiValue<{
    value: string;
    label: string;
  }>, _: ActionMeta<{
    value: string;
    label: string;
  }>) => {
    const tagIds: string[] = newTags.map(tag => tag.value);
    setPost({...post, tagIds});
  }

  const options = [
    { value: 'g01', label: 'アイビー' },
    { value: 'g02', label: 'ヘチマ' },
    { value: 'g03', label: 'ガジュマル' }
  ]

  const defaultTags = options.map((option) => {
    return post.tagIds.includes(option.value) ? option : false;
  })

  return (
    <>

      <TagSelect>

       <Select
          isMulti
          defaultValue={defaultTags}
          name="tags"
          options={options}
          onChange={change}
        />

      </TagSelect>
      
    </>
  )
}

const TagSelect = styled.div`
  margin: 0;
`;

export default CreateStep3