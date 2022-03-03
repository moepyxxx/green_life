import React from 'react'
import Select from 'react-select'
import styled from 'styled-components';

const CreateStep3: React.FC = () => {
 
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