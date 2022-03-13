import React, { useEffect, useState } from 'react'
import Select, { ActionMeta, MultiValue } from 'react-select'
import styled from 'styled-components';
import { IApiTag } from '../../../pages/posts/interfaces/apiTag';
import { IPost } from '../../../pages/posts/interfaces/post';
import useFetch from '../../../utility/customhooks/useFetch';

type Props = {
  post: IPost
  setPost: (post: IPost) => void
}

export type ReactSelectOption = {
  value: string;
  label: string;
}

const CreateStep3: React.FC<Props> = ({ post, setPost }) => {
 
  const [selectOptions, setSelectOptions] = useState<ReactSelectOption[]>([])
  const apiFetch = useFetch()

  useEffect(() => {
    setSelectOption();
  }, [])

  const setSelectOption = async () => {
    const tags: IApiTag[] = await apiFetch<IApiTag[]>('tags');
    setSelectOptions(tags.map(tag => {
      return {
        value: tag._id,
        label: tag.label
      }
    }))
  }

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

  const defaultTags = selectOptions.map((option) => {
    return post.tagIds.includes(option.value) ? option : false;
  })

  return (
    <>

      <TagSelect>

       <Select
          isMulti
          defaultValue={defaultTags}
          name="tags"
          options={selectOptions}
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