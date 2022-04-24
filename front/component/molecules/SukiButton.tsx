import styled from "styled-components";
import getColor from "../../utility/getColor";
import Heart from "../pattern/Heart";

type Props = {
  isActive: boolean;
  count: number;
};

const SukiButton: React.FC<Props> = ({ isActive, count }) => {
  return (
    <Button>
      <Icon>
        <Heart color={isActive ? "secondary" : "primary"} />
      </Icon>
      <Count isActive={isActive}>{count.toLocaleString()}</Count>
    </Button>
  );
};
export default SukiButton;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

const Count = styled.span`
  vertical-align: middle;
  color: ${(props) => getColor(props.isActive ? "secondary" : "primary")};
  font-size: 1.4rem;
  font-family: "Bitter", sans-serif;
  font-weight: 600;
`;

const Icon = styled.span`
  vertical-align: middle;
  margin-right: 8px;
`;
