import getColor from "../../utility/getColor";
import TColor from "../types/color";

type Props = {
  color?: TColor;
};
const Heart: React.FC<Props> = ({ color = "primary" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.43511C10.011 -0.963895 0 -0.161894 0 8.00311C0 12.0711 3.06 17.4841 12 23.0001C20.94 17.4841 24 12.0711 24 8.00311C24 -0.114894 14 -0.995895 12 4.43511V4.43511Z"
        fill={getColor(color)}
      />
    </svg>
  );
};
export default Heart;
