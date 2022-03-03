import React from 'react'
import styled from 'styled-components';
import ArrowTextButton from './ArrowTextButton';

export type TStepPagination = {
  isValid: boolean;
  text?: string;
  click?: () => void;  
};

type Props = {
  next: TStepPagination
  back: TStepPagination
}
const StepPagination: React.FC<Props> = ( { next, back } ) => {

  const isNext = next.isValid && next.text && next.click;
  const isBack = back.isValid && back.text && back.click;

  return(
    <Pagination>
      <Inner>
        {isBack ? <ArrowTextButton click={back.click} arrow='left' text={back.text} /> : ''}
      </Inner>

      <Inner>
        {isNext ? <ArrowTextButton click={next.click} arrow='right' text={next.text} /> : ''}
      </Inner>
    </Pagination>
  )
}
export default StepPagination;

const Pagination = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Inner = styled.div`
  width: 50%;

  &:last-child {
    text-align: right;
  }
`;