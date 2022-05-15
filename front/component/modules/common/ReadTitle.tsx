import React from "react";

import { Spacing } from "../../../styles/components/Spacing";
import { TextAlign } from "../../../styles/components/TextAlign";

import Typography from "../../atoms/Typography";
import ExplanationButton from "./ExplanationButton";

import TColor from "../../types/color";

export type Props = {
  main: string;
  sub?: string;
  align?: "center" | "left" | "right";
  mainColor?: TColor;
  isExplanation?: boolean;
  explanationClick?: () => void;
};
const ReadTitle: React.FC<Props> = ({
  main,
  sub,
  align = "center",
  mainColor = "base",
  isExplanation,
  explanationClick,
}) => {
  const explanation = () => {
    if (isExplanation && explanationClick) {
      return <ExplanationButton click={explanationClick} />;
    } else {
      return <></>;
    }
  };
  return (
    <TextAlign align={align}>
      <Spacing mt={5} mb={2}>
        <Typography size="large" weight="bold" color={mainColor}>
          {main}
          {explanation()}
        </Typography>
      </Spacing>
      {sub ? <Typography size="medium">{sub}</Typography> : <></>}
    </TextAlign>
  );
};
export default ReadTitle;
