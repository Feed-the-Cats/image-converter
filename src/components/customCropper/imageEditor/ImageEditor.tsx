import cn from "classnames";
import { useRef, useState } from "react";
import {
  Cropper,
  CropperPreviewRef,
  CropperRef,
  Size,
} from "react-advanced-cropper";
//import { AdjustablePreviewBackground } from '../adjustablePreviewBackground/AdjustablePreviewBackground';
import { ResetIcon } from "@/assets/icons/ResetIcon";
import "react-advanced-cropper/dist/style.css";
import { AdjustableCropperBackground } from "../adjustableCropperBackground/AdjustableCropperBackground";
import { Button } from "../button/Button";
import { Navigation } from "../navigation/Navigation";
import { Slider } from "../slider/Slider";
import "./ImageEditor.css";

// The polyfill for Safari browser. The dynamic require is needed to work with SSR
if (typeof window !== "undefined") {
  /* require('context-filter-polyfill'); */
  () => import("context-filter-polyfill");
}

type adjusmentType = {
  [index: string]: number;
  brightness: number;
  hue: number;
  saturation: number;
  contrast: number;
};

export const ImageEditor = () => {
  const cropperRef = useRef<CropperRef>(null);
  const previewRef = useRef<CropperPreviewRef>(null);

  const [src, setSrc] = useState(
    "/react-advanced-cropper/img/images/pexels-photo-4383577.jpeg"
  );

  const [mode, setMode] = useState("crop");

  const [adjustments, setAdjustments] = useState<adjusmentType>({
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0,
  });

  const onChangeValue = (value: number) => {
    if (mode in adjustments) {
      setAdjustments((previousValue) => ({
        ...previousValue,
        [mode]: value,
      }));
    }
  };

  const onReset = () => {
    setMode("crop");
    setAdjustments({
      brightness: 0,
      hue: 0,
      saturation: 0,
      contrast: 0,
    });
  };

  const onUpload = (blob: string) => {
    onReset();
    setMode("crop");
    setSrc(blob);
  };

  const onDownload = () => {
    if (cropperRef.current) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.body.innerHTML = `<img src="${cropperRef.current
          .getCanvas()
          ?.toDataURL()}"/>`;
      }
    }
  };

  const onUpdate = () => {
    previewRef.current?.refresh();
  };

  const changed = Object.values(adjustments).some((el) => Math.floor(el * 100));

  const cropperEnabled = mode === "crop";

  /* const defaultVisibleArea = {
    width: cropperRef?.current
      ? (cropperRef?.current.getCanvas()?.width as number)
      : 100,
    height: cropperRef?.current
      ? (cropperRef?.current.getCanvas()?.height as number)
      : 100,
    left: 0,
    top: 0,
  }; */

  /*   if (cropperRef.current) {
    cropperRef.current.setCoordinates({
      width: cropperRef?.current.getCanvas()?.width,
      height: cropperRef?.current.getCanvas()?.height,
      left: 0,
      top: 0,
    });
  } */

  /*   type sizeType = {
    imageSize: { width: number; height: number };
    visibleArea: { width: number; height: number };
  }; */

  const defaultSize = ({ imageSize, visibleArea }: any): Size => {
    return {
      width: (visibleArea || imageSize).width,
      height: (visibleArea || imageSize).height,
    };
  };

  return (
    <div className={"image-editor"}>
      <div className="image-editor__cropper">
        <Cropper
          src={src}
          defaultSize={defaultSize}
          ref={cropperRef}
          stencilProps={{
            movable: cropperEnabled,
            resizable: cropperEnabled,
            lines: cropperEnabled,
            handlers: cropperEnabled,
            overlayClassName: cn(
              "image-editor__cropper-overlay",
              !cropperEnabled && "image-editor__cropper-overlay--faded"
            ),
          }}
          backgroundWrapperProps={{
            scaleImage: cropperEnabled,
            moveImage: cropperEnabled,
          }}
          backgroundComponent={AdjustableCropperBackground}
          backgroundProps={adjustments}
          onUpdate={onUpdate}
        />
        {mode !== "crop" && (
          <Slider
            className="image-editor__slider"
            value={adjustments[mode]}
            onChange={onChangeValue}
          />
        )}
        {/*         <CropperPreview
          className={'image-editor__preview'}
          ref={previewRef}
          cropper={cropperRef}
          backgroundComponent={AdjustablePreviewBackground}
          backgroundProps={adjustments}
        /> */}
        <Button
          className={cn(
            "image-editor__reset-button",
            !changed && "image-editor__reset-button--hidden"
          )}
          onClick={onReset}
        >
          <ResetIcon />
        </Button>
      </div>
      <Navigation
        mode={mode}
        onChange={setMode}
        onUpload={onUpload}
        onDownload={onDownload}
      />
    </div>
  );
};
