import React, { useRef, useEffect } from 'react'
import styled from 'styled-components';
import getColor from '../../utility/getColor';
import TColor from '../types/color';

type Props = {
  fill?: TColor
}
const Wave: React.FC<Props> = ({ fill = 'primary' }) => {
  const canvasRef = useRef(null)

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;
    return canvas.getContext('2d');
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    
    const canvas = canvasRef.current;
    canvas.width = canvasRef.current.offsetWidth;
    canvas.height =  canvasRef.current.offsetHeight * 2;

    ctx.fillStyle = getColor(fill);

    // ここからWave
    const canvasEndY = canvas.height;
    const canvasEndX = canvas.width;

    const waveStartY = 24;
    drow(ctx, waveStartY, canvasEndX, canvasEndY);
  })

  const drow = (ctx, waveStartY, canvasEndX, canvasEndY) => {

    const amplitude = 24;
    const period = 100;
    const degree = 0;

    ctx.beginPath();
    ctx.moveTo(0, waveStartY);

    for (let x = 0; x <= canvasEndX; x += 1) {
      const y = - amplitude * Math.sin((Math.PI / period) * (degree + x));
      ctx.lineTo(x, y + waveStartY);
    }

    ctx.lineTo(canvasEndX, canvasEndY);
    ctx.lineTo(0, canvasEndY);
    ctx.closePath();
    ctx.fill();
  }


  return (
    <WaveWrap>
      <Canvas className="canvas" width="" height="" ref={canvasRef} />
    </WaveWrap>
  );
}
export default Wave

const WaveWrap = styled.section`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 24px;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 24px;
  position: absolute;
  left: 0;
`;