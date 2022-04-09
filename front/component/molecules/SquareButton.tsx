import React, { ReactChild } from 'react'
import styled from 'styled-components';
import getColor from '../../utility/getColor';
import TColor from '../types/color'
import Typography from '../atoms/Typography';

type Props = {
  children: ReactChild
  color?: TColor
  bgColor?: TColor
  margin?: string
  isDisable?: boolean
  click: () => void
}
const SquareButton: React.FC<Props> = ( { bgColor = 'secondary', color = "white", margin = "0", isDisable = false, children, click } ) => {

  if (isDisable) {
    return(
      <DisabledButton bgColor={bgColor} margin={margin}>
        <Typography size="regular" weight='bold' color={color}>{children}</Typography>
      </DisabledButton>
    )
  } else {
  return (
      <Button onClick={click} bgColor={bgColor} margin={margin}>
        <Typography size="regular" weight='bold' color={color}>{children}</Typography>
      </Button>
    );
  }
}

export default SquareButton

const Button = styled.button`
  border: none;
  min-width: 180px;
  border-radius: 4px;
  padding: 8px;
  border: none;
  margin: ${prop => prop.margin};
  background-color: ${prop => getColor(prop.bgColor)};
  ${prop => prop.isDisable }
`;

const DisabledButton = styled(Button)`
  pointer-events: none;
  opacity: 0.3;
`