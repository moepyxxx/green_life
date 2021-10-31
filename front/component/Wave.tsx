import React, { useRef, useEffect } from 'react'

const style = {
  width: "100%",
  height: "700px"
}

const Wave = () => {
  const canvasRef = useRef(null)

  
  const getContext = (): CanvasRenderingContext2D => {
    const canvas: any = canvasRef.current;

    return canvas.getContext('2d');
  };

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = getContext();
    const canvas = canvasRef.current;

    canvas.width = canvasRef.current.offsetWidth;
    canvas.height =  canvasRef.current.offsetHeight;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let degrees = 0; degrees < canvas.width; degrees += 5) {

      setTimeout(() => {
        let x = degrees;
        let radians = (Math.PI / 180) * degrees;
        let y = Math.floor(Math.sin(radians) * 30) + canvas.height / 2;
        drawArc(x, y, ctx);
      }, 2 * degrees);

    }

  })

  const drawArc = (x, y, ctx) => {
    ctx.fillStyle = '#93B69C';
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 1, false);
    ctx.fill();
  }

  return (
    <div>

      <canvas style={style} className="canvas" width="" height="" ref={canvasRef} />
    </div>
  );
}
export default Wave