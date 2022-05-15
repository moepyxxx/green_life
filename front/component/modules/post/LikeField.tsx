import styled from "styled-components";
import Image from "next/image";

import IconHeart from "../../../img/icon/heart.svg";
import IconHeartFill from "../../../img/icon/heart-fill.svg";
import IconPlus from "../../../img/icon/plus.svg";
import Typography from "../../parts/Typography";
import { Flex } from "../../../styles/components/Flex";
import { Spacing } from "../../../styles/components/Spacing";
import Box from "../../parts/Box";

type Props = {
  isActive: boolean;
  count: number;
};

const LikeField: React.FC<Props> = ({ isActive, count }) => {
  return (
    <Flex alignItems="center">
      <Image
        src={isActive ? IconHeartFill : IconHeart}
        width="32"
        height="32"
        alt="お気に入りアイコン"
      />
      <Typography size="medium" margin="0 8px">
        {count.toLocaleString()}
      </Typography>
      <AddButton>
        <Box bgColor="gray" paddingV={2} marginH={0}>
          <Image src={IconPlus} width="28" height="28" alt="追加アイコン" />
        </Box>
      </AddButton>
    </Flex>
  );
};
export default LikeField;

const AddButton = styled.button`
  border: none;
  background: transparent;
`;
