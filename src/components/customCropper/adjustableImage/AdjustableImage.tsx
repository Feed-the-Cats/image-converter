import cn from "classnames";
import { CSSProperties, forwardRef, useLayoutEffect, useRef } from "react";
import { CropperSource, mergeRefs } from "react-advanced-cropper";
// import "./AdjustableImage.css";

interface Props {
  src?: string;
  className?: string;
  crossOrigin?: "anonymous" | "use-credentials" | boolean;
  brightness?: number;
  saturation?: number;
  hue?: number;
  contrast?: number;
  sepia: number;
  invert?: number;
  style?: CSSProperties;
}

export const AdjustableImage = forwardRef<HTMLCanvasElement, Props>(
  (
    {
      src,
      className,
      crossOrigin,
      brightness = 0,
      saturation = 0,
      hue = 0,
      contrast = 0,
      sepia = 0,
      invert = 0,
      style,
    }: Props,
    ref,
  ) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawImage = () => {
      const image = imageRef.current;
      const canvas = canvasRef.current;
      if (canvas && image && image.complete) {
        const ctx = canvas.getContext("2d");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        if (ctx) {
          ctx.filter = [
            `brightness(${100 + brightness * 100}%)`,
            `contrast(${100 + contrast * 100}%)`,
            `saturate(${100 + saturation * 100}%)`,
            `hue-rotate(${hue * 360}deg)`,
            `sepia(${sepia * 100 < 0 ? 0 : sepia * 100}%)`,
            `invert(${invert * 100 < 0 ? 0 : invert * 100}%)`,
          ].join(" ");

          ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
        }
      }
    };

    useLayoutEffect(() => {
      drawImage();
    }, [src, brightness, saturation, hue, contrast, sepia, invert]);

    return (
      <>
        <canvas
          key={`${src}-canvas`}
          ref={mergeRefs([ref, canvasRef])}
          className={cn("adjustable-image-element", className)}
          style={style}
        />{" "}
        <CropperSource
          key={`${src}-img`}
          ref={imageRef}
          className={cn("hidden")}
          src={src}
          crossOrigin={crossOrigin}
          onLoad={drawImage}
        />
      </>
    );
  },
);

AdjustableImage.displayName = "AdjustableImage";
