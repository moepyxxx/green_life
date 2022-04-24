import { Spacing } from "../../../styles/components/Spacing";
import { TextAlign } from "../../../styles/components/TextAlign";
import Typography from "../../atoms/Typography";
import Tree from "../../pattern/Tree";

const GreenLifeDescription = () => {
  return (
    <TextAlign align="center">
      <Spacing mt={15}>
        <Tree color="secondary" />
        <Typography size="large" weight="bold" margin="0 0 16px">
          green Lifeへようこそ
        </Typography>
        <Typography size="regular">
          グリーンがちょっと気になる人同士集まって
        </Typography>
        <Typography size="regular">
          何気ない毎日をちょっと明るくしましょう
        </Typography>
      </Spacing>
    </TextAlign>
  );
};
export default GreenLifeDescription;
