import TSize from "../component/types/size";

const getSize = (color: TSize) => {
  switch (color) {
    case "small":
      return "1.2";
    case "regular":
      return "1.4";
    case "medium":
      return "1.6";
    case "large":
      return "1.8";
    default:
      return "1.6";
  }
};

export default getSize;
