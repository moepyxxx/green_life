import React from "react";
import styled from "styled-components";

import Box from "../../../parts/Box";
import ArrowTextButton from "../ArrowTextButton";

import { Flex } from "../../../../styles/components/Flex";

export type TStepPagination = {
  isValid: boolean;
  text?: string;
  click?: () => void;
};

type Props = {
  next: TStepPagination;
  back: TStepPagination;
};
const StepPagination: React.FC<Props> = ({ next, back }) => {
  const isNext = next.isValid && next.text && next.click;
  const isBack = back.isValid && back.text && back.click;

  return (
    <Box bgColor="white" paddingH={2}>
      <Flex alignItems="center" justifyContent="space-between">
        <Inner>
          {isBack ? (
            <ArrowTextButton click={back.click} arrow="left" text={back.text} />
          ) : (
            ""
          )}
        </Inner>

        <Inner>
          {isNext ? (
            <ArrowTextButton
              click={next.click}
              arrow="right"
              text={next.text}
            />
          ) : (
            ""
          )}
        </Inner>
      </Flex>
    </Box>
  );
};
export default StepPagination;

const Inner = styled.div`
  width: 50%;

  &:last-child {
    text-align: right;
  }
`;
