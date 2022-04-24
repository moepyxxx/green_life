import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Back = () => {
  const canvasRef = useRef(null);

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;

    return canvas.getContext("2d");
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();

    const canvas = canvasRef.current;
    canvas.width = canvasRef.current.offsetWidth;
    canvas.height = canvasRef.current.offsetHeight * 2;

    ctx.fillStyle = "#93B69C";

    // ここからWave
    const canvasEndY = canvas.height;
    const canvasEndX = canvas.width;

    const waveStartY = 24;
    drow(ctx, waveStartY, canvasEndX, canvasEndY);
  });

  const drow = (ctx, waveStartY, canvasEndX, canvasEndY) => {
    const amplitude = 24;
    const period = 100;
    const degree = 0;

    ctx.beginPath();
    ctx.moveTo(0, waveStartY);

    for (let x = 0; x <= canvasEndX; x += 1) {
      const y = -amplitude * Math.sin((Math.PI / period) * (degree + x));
      ctx.lineTo(x, y + waveStartY);
    }

    ctx.lineTo(canvasEndX, canvasEndY);
    ctx.lineTo(0, canvasEndY);
    ctx.closePath();
    ctx.fill();
  };

  return (
    <BackSection>
      <Canvas className="canvas" width="" height="" ref={canvasRef} />
    </BackSection>
  );
};
export default Back;

const BackSection = styled.section`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
`;

const fadeIn = keyframes`
  from {
    top: 900px;
  }
  to {
    top: -1800px;
  }
`;

const Canvas = styled.canvas`
  animation: ${fadeIn} 3s ease-in-out forwards;
  width: 100%;
  height: 200vh;
  position: absolute;
  left: 0;
`;
