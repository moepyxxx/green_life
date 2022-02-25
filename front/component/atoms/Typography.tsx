import { ReactChild } from 'react';
import styled from 'styled-components';
import getColor from '../../utility/getColor';
import getSize from '../../utility/getSize';
import TColor from "../types/color";
import TSize from "../types/size";

type Props = {
  color?: TColor;
  size?: TSize;
  children: ReactChild;
  margin?: string;
  family?: 'Noto Sans JP' | 'Bitter';
}

const Typography: React.FC<Props> = ({ color = 'base', size = 'medium', family = 'Noto Sans JP', margin = '0', children }) => {

  return(
    <Text size={size} color={color} margin={margin} family={family}>{children}</Text>
  )
}

const Text = styled.p`
  font-size: ${prop => getSize(prop.size)}rem;
  color: ${prop => getColor(prop.color)};
  font-family: "${prop => prop.family}", sans-serif;
  margin: ${prop => prop.margin};
`;

export default Typography;