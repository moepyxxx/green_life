import React from "react";

import { Spacing } from "../../../styles/components/Spacing";
import { TextAlign } from "../../../styles/components/TextAlign";

import Typography from "../../atoms/Typography";

type Props = {
  align?: "center" | "left" | "right";
  main: string;
  sub?: string;
};
const ReadTitle: React.FC<Props> = ({ align = "center", main, sub }) => {
  return (
    <Spacing pl={4} pr={4}>
      <TextAlign align={align}>
        <Spacing mt={5} mb={2}>
          <Typography size="large" weight="bold">
            {main}
          </Typography>
        </Spacing>
        {sub ? <Typography size="medium">{sub}</Typography> : <></>}
      </TextAlign>
    </Spacing>
  );
};
export default ReadTitle;
