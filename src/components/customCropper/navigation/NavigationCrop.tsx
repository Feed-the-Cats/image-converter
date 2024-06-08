import { BrightnessIcon } from "@/assets/icons/BrightnessIcon";
import { CheckIcon } from "@/assets/icons/CheckIcon";
import { CircleIcon } from "@/assets/icons/CircleIcon";
import { ContrastIcon } from "@/assets/icons/ContrastIcon";
import { CropIcon } from "@/assets/icons/CropIcon";
import { DownloadIcon } from "@/assets/icons/DownloadIcon";
import { HueIcon } from "@/assets/icons/HueIcon";
import { InvertIcon } from "@/assets/icons/InvertIcon";
import { SaturationIcon } from "@/assets/icons/SaturationIcon";
import { SepiaIcon } from "@/assets/icons/SepiaIcon";
import { SquareIcon } from "@/assets/icons/SquareIcon";
import { asFilterActive, cropStencil, origine } from "@/store/store";
import cn from "classnames";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FC, JSX, useEffect } from "react";
import { Button } from "../button/Button";

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
}): JSX.Element => {
  const originePage = useAtomValue(origine);
  const [isFilterActive, setIsFilterActive] = useAtom(asFilterActive);
  const setStencil = useSetAtom(cropStencil);

  useEffect(() => {
    return () => {
      setIsFilterActive(false);
      //onChange?.("square");
      setStencil("square");
    };
  }, []);

  return (
    <div
      className={cn(
        "flex h-20 items-center justify-center border-t border-border bg-crop px-4 sm:px-2",
        className,
      )}
    >
      <div className={cn("flex items-center justify-center")}>
        {originePage === "cropper" && !isFilterActive ? (
          <Button
            className={"image-editor-navigation__button"}
            active={mode === "crop"}
            onClick={() => onDownload()}
          >
            <DownloadIcon className="h-6 w-6" />
          </Button>
        ) : originePage !== "cropper" && !isFilterActive ? (
          <Button
            className={"image-editor-navigation__button"}
            active={mode === "crop"}
            onClick={() => {
              onChange?.("crop"), onDownload();
            }}
          >
            <CropIcon className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            className={"image-editor-navigation__button"}
            active={mode === "crop"}
            onClick={() => {
              onChange?.("crop"), onDownload();
            }}
          >
            <CheckIcon className="h-6 w-6" />
          </Button>
        )}

        {isFilterActive ? (
          <>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "saturation"}
              onClick={() => onChange?.("saturation")}
            >
              <SaturationIcon className="h-6 w-6" />
            </Button>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "brightness"}
              onClick={() => onChange?.("brightness")}
            >
              <BrightnessIcon className="h-6 w-6" />
            </Button>
            <Button
              className={"image-editor-navigation__button"}
              active={mode === "contrast"}
              onClick={() => onChange?.("contrast")}
            >
              <ContrastIcon className="h-6 w-6" />
            </Button>
            <Button
              className={cn("mx-2 sm:mx-1")}
              active={mode === "hue"}
              onClick={() => onChange?.("hue")}
            >
              <HueIcon className="h-6 w-6" />
            </Button>
            <Button
              className={cn("mx-2 sm:mx-1")}
              active={mode === "sepia"}
              onClick={() => onChange?.("sepia")}
            >
              <SepiaIcon className="h-6 w-6" />
            </Button>
            <Button
              className={cn("mx-2 sm:mx-1")}
              active={mode === "invert"}
              onClick={() => onChange?.("invert")}
            >
              <InvertIcon className="h-6 w-6" />
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
              <SquareIcon className="h-6 w-6" />
            </Button>
            <Button
              className={cn("mx-2 sm:mx-1")}
              active={mode === "circle"}
              onClick={() => {
                onChange?.("circle"), setStencil("circle");
              }}
            >
              <CircleIcon className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
