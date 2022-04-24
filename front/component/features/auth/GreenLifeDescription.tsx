import styled from "styled-components";
import Typography from "../../atoms/Typography";
import Tree from "../../pattern/Tree";

const GreenLifeDescription = () => {
  return (
    <Descriptoin>
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
    </Descriptoin>
  );
};
export default GreenLifeDescription;

const Descriptoin = styled.div`
  text-align: center;
  margin-top: 60px;
`;
