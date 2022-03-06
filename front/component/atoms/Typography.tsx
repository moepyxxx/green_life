import { ReactChild, ReactNode } from 'react';
import styled from 'styled-components';
import getColor from '../../utility/getColor';
import getSize from '../../utility/getSize';
import TColor from "../types/color";
import TSize from "../types/size";

type Props = {
  color?: TColor;
  size?: TSize;
  children: ReactNode;
  margin?: string;
  weight?: 'bold' | 'normal';
  family?: 'Noto Sans JP' | 'Bitter';
  underline?: boolean;
}

const Typography: React.FC<Props> = ({
  color = 'base',
  size = 'medium',
  family = 'Noto Sans JP',
  margin = '0',
  weight = 'normal',
  underline = false,
  children
}) => {

  return(
    <Text size={size} color={color} margin={margin} family={family} weight={weight} underline={underline}>{children}</Text>
  )
}

const Text = styled.p`
  font-size: ${prop => getSize(prop.size)}rem;
  color: ${prop => getColor(prop.color)};
  font-family: "${prop => prop.family}", sans-serif;
  margin: ${prop => prop.margin};
  font-weight: ${prop => prop.weight};
  ${props => props.underline && `
    text-decoration: underline;
    display: inline;
  `}
`;

export default Typography;