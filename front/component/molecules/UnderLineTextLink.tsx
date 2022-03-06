import React, { ReactChild } from 'react';
import Link from 'next/link'
import styled from 'styled-components';
import getColor from '../../utility/getColor';
import Typography from '../atoms/Typography';
import TSize from '../types/size';

type Props = {
  size: TSize
  linkPath: string
  children: ReactChild
}
const UnderLineTextLink: React.FC<Props> = ( { size, linkPath, children } ) => {
  return (
    <Link href={linkPath} passHref>
      <>
        <Typography tag="span" size={size} color="secondary" underline={true}>{children}</Typography>
      </>
    </Link>
  )
}

export default UnderLineTextLink

const Button = styled.button`
  cursor: pointer;
  position: relative;
  border: none;
  background-color: transparent;
`;

const Icon = styled.span`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.arrow === 'right' && `
    right: 0;
  `}
  ${props => props.arrow === 'left' && `
    left: 0;
  `}
  &:after, &:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    top: 50%;
    transform: rotate(45deg) translateY(-50%);
  }

  &:before {
    background: ${getColor('secondary')};
    ${props => props.arrow === 'left' && `
      left: 0;
    `}
    ${props => props.arrow === 'right' && `
      right: 0;
    `}
  }

  &:after {
    background: #fff;
    ${props => props.arrow === 'left' && `
      left: 2px;
    `}
    ${props => props.arrow === 'right' && `
      right: 2px;
    `}
  }
`;