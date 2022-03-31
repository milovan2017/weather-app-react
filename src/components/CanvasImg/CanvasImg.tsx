import React, { useEffect } from "react";
import { convertRange, rgbString } from "../../utils";

interface IImgCanvasProps {
  avgTemp: number;
  setRgb: (rgb: string) => void;
}

export const ImgCanvas: React.FC<IImgCanvasProps> = ({ avgTemp, setRgb }) => {
  useEffect(() => {
    const canvas: any = document.getElementById("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const imageObj = new Image();
      imageObj.src = "/img/gradientImg.png";
      ctx.canvas.width = 383;
      ctx.canvas.height = 18;
      imageObj.onload = function () {
        ctx.drawImage(imageObj, 0, 0, 383, 10);
        const rangeValue = Math.round(convertRange(avgTemp, -40, 40, 0, 383));
        const canvasColor = ctx.getImageData(rangeValue, 1, 1, 1).data;
        const color = rgbString(canvasColor[0], canvasColor[1], canvasColor[2]);
        setRgb(color);
      };
    }
  });

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
};
