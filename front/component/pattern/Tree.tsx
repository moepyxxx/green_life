import getColor from "../../utility/getColor";
import TColor from "../types/color";

type Props = {
  color?: TColor;
};
const Tree: React.FC<Props> = ({ color = "primary" }) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 25H12V19.874C11.194 19.666 10.487 19.213 9.961 18.6C9.359 18.857 8.696 19 8 19C5.24 19 3 16.76 3 14C3 12.578 3.595 11.293 4.55 10.383C4.202 9.839 4 9.193 4 8.5C4 6.622 5.483 5.087 7.341 5.004C8.164 2.672 10.388 1 13 1C15.612 1 17.836 2.672 18.659 5.004C20.517 5.087 22 6.622 22 8.5C22 9.193 21.798 9.839 21.45 10.383C22.405 11.293 23 12.578 23 14C23 16.76 20.76 19 18 19C17.304 19 16.641 18.857 16.039 18.6C15.513 19.213 14.806 19.666 14 19.874V25Z"
        fill={getColor(color)}
      />
    </svg>
  );
};
export default Tree;
