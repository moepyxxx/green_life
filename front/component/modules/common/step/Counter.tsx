import React from "react";
import styled from "styled-components";

import { Flex } from "../../../../styles/components/Flex";
import { Spacing } from "../../../../styles/components/Spacing";

import getColor from "../../../../utility/getColor";
import getShadow from "../../../../utility/getShadow";
import getSize from "../../../../utility/getSize";

type Props = {
  allCount: number;
  currentCount: number;
};
const StepCounter: React.FC<Props> = ({ allCount, currentCount }) => {
  return (
    <Spacing ma="0 auto">
      <Flex alignItems="center">
        {Array.from(new Array(allCount))
          .map((_, i) => i + 1)
          .map((index) => {
            return index === currentCount ? (
              <Number index={index} current={true} key={index} />
            ) : (
              <Number index={index} current={false} key={index} />
            );
          })}
      </Flex>
    </Spacing>
  );
};

export default StepCounter;

const Number = styled.span`
  width: ${(prop) => (prop.current ? "48px" : "40px")};
  height: ${(prop) => (prop.current ? "48px" : "40px")};
  border-radius: 50%;
  margin: 0 8px;
  box-shadow: ${getShadow()};
  background: ${(prop) =>
    prop.current ? getColor("primary") : getColor("white")};
  border: none;
  position: relative;
  &:after {
    content: "${(prop) => prop.index}";
    font-weight: ${(prop) => (prop.current ? "bold" : "normal")};
    color: ${(prop) =>
      prop.current ? getColor("white") : getColor("primary")};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${(prop) =>
      prop.current ? getSize("medium") : getSize("regular")};
  }
`;
