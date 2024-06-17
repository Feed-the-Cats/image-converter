import { ResetIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { asFilterActive, cropStencil, imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC, JSX, RefObject, useState } from "react";
import {
  CircleStencil,
  Cropper,
  CropperPreviewRef,
  CropperRef,
  RectangleStencil,
  Size,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { AdjustableCropperBackground } from "../adjustableCropperBackground/AdjustableCropperBackground";
import { Button } from "../button/Button";
import { Navigation } from "../navigation/NavigationCrop";
import { Slider } from "../slider/Slider";

if (typeof window !== "undefined") {
  () => import("context-filter-polyfill");
}

type adjusmentType = {
  [index: string]: number;
  brightness: number;
  hue: number;
  saturation: number;
  contrast: number;
  sepia: number;
  invert: number;
};

export type allRefsType = {
  cropperRef: RefObject<CropperRef>;
  previewRef: RefObject<CropperPreviewRef>;
};
type Props = {
  downloadImage: () => void;
  allRefs: allRefsType;
};

export const ImageEditor: FC<Props> = ({
  downloadImage,
  allRefs,
}): JSX.Element => {
  const isFilterActive = useAtomValue(asFilterActive);
  const [mode, setMode] = useState(isFilterActive ? "saturation" : "square");
  const image = useAtomValue(imageSource);
  const stencil = useAtomValue(cropStencil);
  const cropperEnabled = !isFilterActive;
  const { cropperRef, previewRef } = allRefs;
  const [adjustments, setAdjustments] = useState<adjusmentType>({
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0,
    sepia: 0,
    invert: 0,
  });
  const changed = Object.values(adjustments).some((el) => Math.floor(el * 100));

  const onChangeValue = (value: number) => {
    if (mode in adjustments) {
      setAdjustments((previousValue) => ({
        ...previousValue,
        [mode]: value,
      }));
    }
  };

  const onReset = () => {
    setMode(isFilterActive ? "saturation" : "square");
    setAdjustments({
      brightness: 0,
      hue: 0,
      saturation: 0,
      contrast: 0,
      sepia: 0,
      invert: 0,
    });
  };

  const onUpdate = () => {
    previewRef.current?.refresh();
  };

  const defaultSize = ({ imageSize, visibleArea }: any): Size => {
    return {
      width: (visibleArea || imageSize).width,
      height: (visibleArea || imageSize).height,
    };
  };

  return (
    <div className={cn("border text-teal-400")}>
      <div className={cn("relative h-[500px] max-h-screen bg-card")}>
        <Cropper
          src={image}
          defaultSize={defaultSize}
          ref={cropperRef}
          stencilProps={{
            movable: cropperEnabled,
            resizable: cropperEnabled,
            lines: cropperEnabled,
            handlers: cropperEnabled,
            overlayClassName: cn(
              "transition-colors duration-75",
              !cropperEnabled ? "text-black/90" : "",
            ),
          }}
          backgroundWrapperProps={{
            scaleImage: cropperEnabled,
            moveImage: cropperEnabled,
          }}
          backgroundComponent={AdjustableCropperBackground}
          backgroundProps={adjustments}
          onUpdate={onUpdate}
          stencilComponent={
            stencil === "circle" ? CircleStencil : RectangleStencil
          }
        />
        {mode !== "crop" && mode !== "square" && mode !== "circle" ? (
          <Slider
            className={cn("absolute bottom-5 left-1/2 w-full -translate-x-1/2")}
            value={adjustments[mode]}
            onChange={onChangeValue}
          />
        ) : null}
        <Button
          className={cn(
            "absolute right-5 top-5 bg-white/10 hover:bg-white/20 hover:fill-teal-400",
            !changed ? "invisible opacity-0" : "",
          )}
          onClick={onReset}
        >
          <ResetIcon />
        </Button>
      </div>
      <Navigation mode={mode} onChange={setMode} onDownload={downloadImage} />
    </div>
  );
};
