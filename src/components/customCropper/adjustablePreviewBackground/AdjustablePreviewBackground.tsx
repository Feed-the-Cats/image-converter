import { getPreviewStyle } from "advanced-cropper";
import {
  CropperImage,
  CropperState,
  CropperTransitions,
  Size,
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
  size?: Size | null;
}

export const AdjustablePreviewBackground = ({
  className,
  cropper,
  crossOrigin,
  brightness = 0,
  saturation = 0,
  hue = 0,
  contrast = 0,
  sepia = 0,
  invert = 0,
  size,
}: Props) => {
  const state = cropper.getState();
  const transitions = cropper.getTransitions();
  const image = cropper.getImage();

  const style =
    image && state && size
      ? getPreviewStyle(image, state, size, transitions)
      : {};

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
      className={className}
      style={style}
    />
  );
};
