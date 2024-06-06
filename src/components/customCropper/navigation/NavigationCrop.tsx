import { BrightnessIcon } from "@/assets/icons/BrightnessIcon";
import { ContrastIcon } from "@/assets/icons/ContrastIcon";
import { CropIcon } from "@/assets/icons/CropIcon";
import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import { HueIcon } from "@/assets/icons/HueIcon";
import { SaturationIcon } from "@/assets/icons/SaturationIcon";
//import { UploadIcon } from "@/assets/icons/UploadIcon";
import { CheckIcon } from "@/assets/icons/CheckIcon";
import { CircleIcon } from "@/assets/icons/CircleIcon";
import { InvertIcon } from "@/assets/icons/InvertIcon";
import { SepiaIcon } from "@/assets/icons/SepiaIcon";
import { SquareIcon } from "@/assets/icons/SquareIcon";
import { asFilterActive, cropStencil, origine } from "@/store/store";
import cn from "classnames";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FC, useEffect } from "react";
import { Button } from "../button/Button";
import "./Navigation.css";

interface Props {
  className?: string;
  mode?: string;
  onChange?: (mode: string) => void;
  onDownload: () => void;
}

export const Navigation: FC<Props> = ({
  className,
  onChange,
  onDownload,
  mode,
}) => {
  const originePage = useAtomValue(origine);
  const [isFilterActive, setIsFilterActive] = useAtom(asFilterActive);
  const setStencil = useSetAtom(cropStencil);
  /*   const setMode = (mode: string) => () => {
    onChange?.(mode);
  }; */

  useEffect(() => {
    return () => {
      setIsFilterActive(false);
      //onChange?.("square");
      setStencil("square");
    };
  }, []);

  //console.log(onDownload);

  /* const inputRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    inputRef.current?.click();
  }; */

  /*   const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    // Reference to the DOM input element
    const { files } = event.target;

    // Ensure that you have a file before attempting to read it
    if (files && files[0]) {
      if (onUpload) {
        onUpload(URL.createObjectURL(files[0]));
      }
    }
    // Clear the event target value to give the possibility to upload the same image:
    event.target.value = "";
  }; */
  console.log("filter", isFilterActive);
  return (
    /* en cours */
    <div
      className={cn(
        "flex h-20 items-center justify-center border-t border-border bg-crop px-4 sm:px-2",
        className,
      )}
    >
      {/* <Button
        className={"image-editor-navigation__button"}
        onClick={onUploadButtonClick}
      >
        <UploadIcon /> 
        <input
          ref={inputRef} 
          type="file"
          accept="image/*"
          onChange={onLoadImage} 
          className={cn("hidden")}
        />
      </Button> */}

      <div className={cn("flex items-center justify-center")}>
        {originePage === "cropper" && !isFilterActive ? (
          <Button
            className={"image-editor-navigation__button"}
            active={mode === "crop"}
            onClick={() => onDownload()}
          >
            <DownloadIcon />
          </Button>
        ) : originePage !== "cropper" && !isFilterActive ? (
          <Button
            className={"image-editor-navigation__button"}
            active={mode === "crop"}
            onClick={() => {
              onChange?.("crop"), onDownload();
            }}
          >
            <CropIcon />
          </Button>
        ) : (
          <Button
            className={"image-editor-navigation__button"}
            active={mode === "crop"}
            onClick={() => {
              onChange?.("crop"), onDownload();
            }}
          >
            <CheckIcon />
          </Button>
        )}

        {isFilterActive ? (
          <>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "saturation"}
              onClick={() => onChange?.("saturation")}
            >
              <SaturationIcon />
            </Button>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "brightness"}
              onClick={() => onChange?.("brightness")}
            >
              <BrightnessIcon />
            </Button>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "contrast"}
              onClick={() => onChange?.("contrast")}
            >
              <ContrastIcon />
            </Button>
            <Button
              className={cn("mx-2 sm:mx-1")}
              active={mode === "hue"}
              onClick={() => onChange?.("hue")}
            >
              <HueIcon />
            </Button>
            <Button
              className={cn("mx-2 sm:mx-1")}
              active={mode === "sepia"}
              onClick={() => onChange?.("sepia")}
            >
              <SepiaIcon />
            </Button>
            <Button
              className={cn("mx-2 sm:mx-1")}
              active={mode === "invert"}
              onClick={() => onChange?.("invert")}
            >
              <InvertIcon />
            </Button>
          </>
        ) : (
          <>
            <Button
              className={cn("mx-2 sm:mx-1")}
              active={mode === "square"}
              onClick={() => {
                onChange?.("square"), setStencil("square");
              }}
            >
              <SquareIcon />
            </Button>
            <Button
              className={cn("mx-2 sm:mx-1")}
              active={mode === "circle"}
              onClick={() => {
                onChange?.("circle"), setStencil("circle");
              }}
            >
              <CircleIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
