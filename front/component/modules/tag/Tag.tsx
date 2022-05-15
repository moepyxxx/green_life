import React from "react";
import Box from "../../parts/Box";
import Typography from "../../atoms/Typography";

type Props = {
  label: string;
};
const Tag: React.FC<Props> = ({ label }) => {
  return (
    <Box marginH={1} marginV={1} width="auto">
      <Typography size="medium">{label}</Typography>
    </Box>
  );
};

export default Tag;
