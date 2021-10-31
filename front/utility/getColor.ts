import TColor from "../component/types/color";

const getColor = ( color: TColor ) => {
  
  switch ( color ) {
    case 'base':
      return '#000';
    case 'white':
      return '#fff';
    case 'primary':
      return '#93B69C';
    case 'secondary':
      return '#47885E';
    default :
      return 'black';
  }
}

export default getColor;