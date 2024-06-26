import { getBackgroundStyle } from "advanced-cropper";
import { forwardRef } from "react";
import {
  CropperImage,
  CropperState,
  CropperTransitions,
} from "react-advanced-cropper";
import { AdjustableImage } from "../adjustableImage/AdjustableImage";

interface DesiredCropperRef {
  getState: () => CropperState;
  getTransitions: () => CropperTransitions;
  getImage: () => CropperImage;
}

interface Props {
  className?: string;
  cropper: DesiredCropperRef;
  crossOrigin?: "anonymous" | "use-credentials" | boolean;
  brightness?: number;
  saturation?: number;
  hue?: number;
  contrast?: number;
  sepia?: number;
  invert?: number;
}

export const AdjustableCropperBackground = forwardRef<HTMLCanvasElement, Props>(
  (
    {
      className,
      cropper,
      crossOrigin,
      brightness = 0,
      saturation = 0,
      hue = 0,
      contrast = 0,
      sepia = 0,
      invert = 0,
    }: Props,
    ref,
  ) => {
    const state = cropper.getState();
    const transitions = cropper.getTransitions();
    const image = cropper.getImage();

    const style =
      image && state ? getBackgroundStyle(image, state, transitions) : {};

    return (
      <AdjustableImage
        src={image?.src}
        crossOrigin={crossOrigin}
        brightness={brightness}
        saturation={saturation}
        hue={hue}
        contrast={contrast}
        sepia={sepia}
        invert={invert}
        ref={ref}
        className={className}
        style={style}
      />
    );
  },
);
