import styled from "styled-components";
import getColor from "../../../utility/getColor";

type Props = {
  click: () => void;
};
const CloseButton: React.FC<Props> = ({ click }) => {
  return <CloseIcon onClick={click} />;
};
export default CloseButton;

const CloseIcon = styled.div`
  position: absolute;
  top: -16px;
  right: -16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${getColor("primary")};
  border: 1px solid #fff;

  &:after {
    content: "×";
    color: ${getColor("white")};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
