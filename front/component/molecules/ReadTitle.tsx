import React from "react";
import { Spacing } from "../../styles/components/Spacing";
import { TextAlign } from "../../styles/components/TextAlign";
import Typography from "../atoms/Typography";
import Tree from "../pattern/Tree";

type Props = {
  isIcon: boolean;
  mainTitle: string;
  subTitle?: string;
};
const ReadTitle: React.FC<Props> = ({ isIcon, mainTitle, subTitle }) => {
  return (
    <Spacing pl={4} pr={4}>
      <TextAlign align="center">
        {isIcon ? <Tree color="primary" /> : <></>}
        <Spacing mt={5} mb={2}>
          <Typography size="large" weight="bold">
            {mainTitle}
          </Typography>
        </Spacing>
        {subTitle ? <Typography size="regular">{subTitle}</Typography> : <></>}
      </TextAlign>
    </Spacing>
  );
};
export default ReadTitle;
