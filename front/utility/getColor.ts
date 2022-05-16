import TColor from "../component/types/color";

const getColor = (color: TColor) => {
  switch (color) {
    case "base":
      return "#F0F0F0";
    case "white":
      return "#fff";
    case "primary":
      return "#3E5656";
    case "secondary":
      return "#C2DAD0";
    case "accent":
      return "#C2972D";
    default:
      return "#3E5656";
  }
};

export default getColor;
