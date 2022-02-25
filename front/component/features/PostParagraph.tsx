import React from 'react'
import styled from 'styled-components';
import Typography from '../atoms/Typography';
import HashTag from '../molecules/HashTag';

type Props = {
  paragraph: {
    name: string;
    userid: string;
    date: string;
    description: string;
    tags: string[]
  }
}
const PostParagraph: React.FC<Props> = ({ paragraph }) => {
  return (
    <>
      <User>
        <Typography size="medium" margin="0 8px 0 0">{paragraph.name}</Typography>
        <Typography size="medium" family="Bitter">{`@${paragraph.userid}`}</Typography>
      </User>

      <Typography size="small" family="Bitter">{paragraph.date}</Typography>
      <Typography margin="16px 0">{paragraph.description}</Typography>
      
      <Tags>
        {paragraph.tags.map((tag, index) => {
          <HashTag isLink={false} key={index}>{tag}</HashTag>
        })}
      </Tags>
    </>
  )
}

const User = styled.div`
  display: flex;
`;

const Tags = styled.ul`
  li {
    margin: 0 20px 20px 0;
  }
`;

export default PostParagraph

