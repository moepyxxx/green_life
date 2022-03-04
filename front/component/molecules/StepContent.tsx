import React, { ReactChild } from 'react'

type Props = {
  stepCount: number;
  currentCount: number;  
  children: ReactChild;
}
const StepContent: React.FC<Props> = ( { stepCount, currentCount, children } ) => {
  if (stepCount !== currentCount) return <></>;
  return <>{children}</>;
}
export default StepContent;