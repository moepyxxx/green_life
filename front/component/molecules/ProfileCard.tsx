import React from 'react'
import styled from 'styled-components';
import Typography from '../atoms/Typography';
import Image from 'next/image';

type Props = {
  displayName: string
  userName: string
  imageUrl: string
}
const ProfileCard: React.FC<Props> = ( { displayName, userName, imageUrl } ) => {
  return (
    <Flex>
      <Icon>
        <Image unoptimized src={imageUrl} width="400" height="400" objectFit="cover" />
      </Icon>
      <Text>
        <Typography>{displayName}</Typography>
        <Typography size="regular" family="Bitter">{userName}</Typography>
      </Text>
    </Flex>
  );
}

export default ProfileCard

const Flex = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Icon = styled.div`
  width: 56px;
`

const Text = styled.div`
  width: calc(100% - 56px - 16px);
`