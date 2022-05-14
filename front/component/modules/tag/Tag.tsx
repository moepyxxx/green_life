import React from "react";
import { IApiTag } from "../../../pages/posts/interfaces/apiTag";
import Box from "../../parts/Box";
import Typography from "../../atoms/Typography";

type Props = {
  tag: IApiTag;
};
const Tag: React.FC<Props> = ({ tag }) => {
  return (
    <Box marginH={1} marginV={1}>
      <Typography size="medium">{tag.label}</Typography>
    </Box>
  );
};

export default Tag;
