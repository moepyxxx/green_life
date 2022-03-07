import React from 'react'
import styled from 'styled-components';

type Props = {
  isActive: boolean;
  position?: "absolute" | "fixed";
}

const Shadow: React.FC<Props> = ( { isActive, position = "fixed" } ) => {

  return (
    <>
      <ShadowContents position={position} isActive={isActive} />
    </>
  )
}

export default Shadow

const ShadowContents = styled.div`
  display: ${(props) => props.isActive ? 'block' : 'none'};
  position: ${prop => prop.position};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  background-color: rgba(31, 71, 45, .36);
`;