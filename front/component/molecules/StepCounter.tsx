import React from "react";
import styled from "styled-components";
import { Flex } from "../../styles/components/Flex";
import { Spacing } from "../../styles/components/Spacing";
import IconButton from "../atoms/IconButton";

type Props = {
  allCount: number;
  currentCount: number;
};
const StepCounter: React.FC<Props> = ({ allCount, currentCount }) => {
  return (
    <Spacing ma="0 auto">
      <Flex>
        {Array.from(new Array(allCount))
          .map((_, i) => i + 1)
          .map((index) => {
            return index === currentCount ? (
              <IconButton
                fill="secondary"
                color="white"
                click={null}
                key={index}
              >
                <Inner weight="bold">{index}</Inner>
              </IconButton>
            ) : (
              <IconButton fill="gray" color="white" click={null} key={index}>
                <Inner weight="normal">{index}</Inner>
              </IconButton>
            );
          })}
      </Flex>
    </Spacing>
  );
};

export default StepCounter;

const Inner = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: ${(prop) => prop.weight};
`;
