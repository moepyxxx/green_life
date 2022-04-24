import React from "react";
import styled from "styled-components";
import TColor from "../types/color";
import getColor from "../../utility/getColor";

type Props = {
  fill: TColor;
};

const Pattern1: React.FC<Props> = ({ fill = "primary" }) => {
  return (
    <SvgWrapper>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={getColor(fill)}
          d="M57.3,-66.8C73.5,-54.7,85.4,-35.9,88.3,-16.1C91.2,3.8,85.1,24.7,74.1,41.9C63.1,59.1,47.2,72.5,28.6,80C9.9,87.4,-11.5,88.8,-29.5,81.9C-47.5,74.9,-62.1,59.6,-71,42.1C-80,24.5,-83.2,4.6,-80.1,-14.3C-77,-33.2,-67.5,-51.2,-53.1,-63.7C-38.7,-76.1,-19.4,-82.9,0.6,-83.6C20.5,-84.3,41.1,-78.9,57.3,-66.8Z"
          transform="translate(100 100)"
        />
      </svg>
    </SvgWrapper>
  );
};
export default Pattern1;

const SvgWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
