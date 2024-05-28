import { BrightnessIcon } from "@/assets/icons/BrightnessIcon";
import { ContrastIcon } from "@/assets/icons/ContrastIcon";
import { CropIcon } from "@/assets/icons/CropIcon";
import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import { HueIcon } from "@/assets/icons/HueIcon";
import { SaturationIcon } from "@/assets/icons/SaturationIcon";
//import { UploadIcon } from "@/assets/icons/UploadIcon";
import { origine } from "@/store/store";
import cn from "classnames";
import { useAtomValue } from "jotai";
import { FC } from "react";
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
  const setMode = (mode: string) => () => {
    onChange?.(mode);
  };

  console.log(onDownload);

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

  return (
    <div className={cn("image-editor-navigation", className)}>
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
            className="image-editor-navigation__upload-input"
          />
        </Button> */}

      <div className="image-editor-navigation__buttons">
        {originePage === "cropper" ? (
          <Button
            className={"image-editor-navigation__button"}
            onClick={() => onDownload()}
          >
            <DownloadIcon />
          </Button>
        ) : (
          <Button
            className={"image-editor-navigation__button"}
            active={mode === "crop"}
            onClick={() => {
              setMode("crop"), onDownload();
            }}
          >
            <CropIcon />
          </Button>
        )}

        {originePage == "filter" && (
          <>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "saturation"}
              onClick={setMode("saturation")}
            >
              <SaturationIcon />
            </Button>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "brightness"}
              onClick={setMode("brightness")}
            >
              <BrightnessIcon />
            </Button>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "contrast"}
              onClick={setMode("contrast")}
            >
              <ContrastIcon />
            </Button>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "hue"}
              onClick={setMode("hue")}
            >
              <HueIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};