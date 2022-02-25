import styled from 'styled-components';

const CatchCopy = () => {
  return (
    <>
      <Large>もっと、暮らしを、□ □ □ 。</Large>
      <Small>green があれば、今日の生活はどうなるだろう？</Small>
    </>
  );
}
export default CatchCopy;


const Large = styled.p`
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
`;
const Small = styled.p`
  font-size: 1.4rem;
  margin: 8px 0 0;
`;