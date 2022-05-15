import React, { ReactChild } from "react";
import styled from "styled-components";

import getColor from "../../utility/getColor";

import TColor from "../types/color";
import Typography from "../parts/Typography";

type Props = {
  children: ReactChild;
  color?: TColor;
  bgColor?: TColor;
};
const Message: React.FC<Props> = ({
  bgColor = "secondary",
  color = "primary",
  children,
}) => {
  return (
    <MessageItem bgColor={bgColor}>
      <Typography color={color} size="regular">
        {children}
      </Typography>
    </MessageItem>
  );
};

export default Message;

const MessageItem = styled.div`
  padding: 12px;
  background: ${(props) => getColor(props.bgColor)};
  border-radius: 8px;
  position: relative;
  &:after {
    content: "";
    border-bottom: 12px solid ${getColor("secondary")};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: absolute;
    left: 12px;
    top: -11px;
  }
`;
