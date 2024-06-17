import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClearImage } from "@/lib/hooks";
import toastConfig from "@/lib/toastonfig";
import { cn } from "@/lib/utils";
import {
  asFilterActive,
  cropStencil,
  imagePreview,
  imageType,
  origine,
} from "@/store/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { FC, JSX, useRef } from "react";
import {
  CropperPreview,
  CropperPreviewRef,
  CropperRef,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { toast } from "react-toastify";
import { ImageEditor } from "../customCropper/imageEditor/ImageEditor";

type CropperViewProps = {
  asFilter?: boolean;
};

const CropperView: FC<CropperViewProps> = ({ asFilter }): JSX.Element => {
  const originePage = useAtomValue(origine);
  const type = useAtomValue(imageType);
  const [isFilterActive, setIsFilterActive] = useAtom(asFilterActive);
  const setPreview = useSetAtom(imagePreview);
  const previewRef = useRef<CropperPreviewRef>(null);
  const cropperRef = useRef<CropperRef>(null);
  const stencil = useAtomValue(cropStencil);
  const setClearImage = useClearImage();

  asFilter ? setIsFilterActive(true) : setIsFilterActive(false);

  const allRefs = {
    cropperRef: cropperRef,
    previewRef: previewRef,
  };

  const downloadBlobCallback = (blob: Blob | null) => {
    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `image.${type}`;
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);

      setClearImage();
      toast.success("Start image download", toastConfig);
    }
  };

  const setObjectBlobCallback = (blob: Blob | null) => {
    if (blob) {
      const blobUri = URL.createObjectURL(blob);
      setPreview(blobUri);
      toast.success("Back to b64 to image for download", toastConfig);
    }
  };

  const cropImage = () => {
    setPreview(
      cropperRef.current?.getCanvas()?.toDataURL(`image/${type}`, 1) as string,
    );
    toast.success("Back to image to b64 for download", toastConfig);
  };

  const downloadImage = () => {
    cropperRef.current && originePage === "imageUri"
      ? cropImage()
      : cropperRef.current && originePage === "cropper"
        ? cropperRef.current
            ?.getCanvas()
            ?.toBlob(downloadBlobCallback, `image/${type}`, 1)
        : cropperRef.current
            ?.getCanvas()
            ?.toBlob(setObjectBlobCallback, `image/${type}`, 1);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl">
          {!isFilterActive ? "Crop image" : "Image filters"}
        </CardTitle>
        {!isFilterActive ? (
          <div className={cn("flex gap-2")}>
            <Button variant={"teal"} onClick={setClearImage}>
              Clear
            </Button>
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col justify-items-center gap-8">
        <div className={cn("relative w-full")}>
          <ImageEditor allRefs={allRefs} downloadImage={downloadImage} />
        </div>
        <div className={cn("flex h-80 w-full items-center justify-center")}>
          <div
            className={cn(
              stencil === "circle"
                ? "h-72 w-72 overflow-hidden rounded-full"
                : "h-full w-full",
            )}
          >
            {!isFilterActive ? (
              <CropperPreview
                className={cn("preview h-full w-full")}
                ref={previewRef}
                cropper={cropperRef}
              />
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropperView;
