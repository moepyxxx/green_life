import React from 'react'
import styled from 'styled-components';
import Typography from '../atoms/Typography';
import Tree from '../pattern/Tree';

type Props = {
  isIcon: boolean;
  mainTitle: string;
  subTitle?: string;
}
const ReadTitle: React.FC<Props> = ( { isIcon, mainTitle, subTitle } ) => {
  return (
    <Wrapper>
      {isIcon ? <Tree color="primary" /> : <></>}
      <MainTitle>
        <Typography size="large" weight="bold">{mainTitle}</Typography>
      </MainTitle>
      {subTitle ? <Typography size="regular">{subTitle}</Typography> : <></>}
    </Wrapper>
  );
}
export default ReadTitle;

const Wrapper = styled.div`
  text-align: center;
  padding: 0 40px;
`;

const MainTitle = styled.div`
  margin: 20px 0 8px;
`;