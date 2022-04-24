import TColor from "../component/types/color";

const getColor = (color: TColor) => {
  switch (color) {
    case "base":
      return "#0C0C0C";
    case "white":
      return "#fff";
    case "primary":
      return "#93B69C";
    case "secondary":
      return "#47885E";
    case "gray":
      return "#D8E0DA";
    case "disable":
      return "#F0F0F0";
    case "danger":
      return "#C53F14";
    default:
      return "#0C0C0C";
  }
};

export default getColor;
