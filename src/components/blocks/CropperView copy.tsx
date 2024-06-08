import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClearImage } from "@/lib/hooks/useClearImage";
import toastConfig from "@/lib/toastonfig";
import { cn } from "@/lib/utils";
import { imagePreview, imageSource, imageType, origine } from "@/store/store";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, JSX, useRef, useState } from "react";
import {
  CircleStencil,
  Coordinates,
  Cropper,
  CropperPreview,
  CropperPreviewRef,
  CropperRef,
  RectangleStencil,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { toast } from "react-toastify";

const CropperView: FC = (): JSX.Element => {
  const img = useAtomValue(imageSource);
  const originePage = useAtomValue(origine);
  const type = useAtomValue(imageType);
  const setPreview = useSetAtom(imagePreview);
  const previewRef = useRef<CropperPreviewRef>(null);
  const cropperRef = useRef<CropperRef>(null);
  const [, setCoordinate] = useState<Coordinates | null>(null);
  const [, setCropperImage] = useState<string | undefined>("");
  const [tencil, setTencil] = useState<"avatar" | "rectangle">("rectangle");
  const setClearImage = useClearImage();

  const actionButtonsClass =
    "w-full bg-[var(--background-action-button)] text-background-invert hover:text-background hover:bg-orange-800 dark:bg-orange-800/30 dark:hover:bg-orange-800 dark:hover:text-white";

  const onChange = (cropper: CropperRef) => {
    setCoordinate(cropper.getCoordinates());
    setCropperImage(cropper.getCanvas()?.toDataURL());
  };

  const onUpdate = () => {
    previewRef.current?.refresh();
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
        <CardTitle className="text-2xl">Crop image</CardTitle>
        <div className={cn("flex gap-2")}>
          <Button
            className={cn("w-full")}
            onClick={() => setTencil("rectangle")}
          >
            rectangle
          </Button>
          <Button className={cn("w-full")} onClick={() => setTencil("avatar")}>
            avatar
          </Button>

          {originePage === "cropper" ? (
            <Button className={cn(actionButtonsClass)} onClick={downloadImage}>
              download
            </Button>
          ) : (
            <Button className={cn(actionButtonsClass)} onClick={downloadImage}>
              crop
            </Button>
          )}
          <Button className={cn(actionButtonsClass)} onClick={setClearImage}>
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-items-center gap-4">
        <div className={cn("relative h-[600px] w-full")}>
          <Cropper
            ref={cropperRef}
            src={img}
            className={cn("cropper", "h-[600px] w-full")}
            onChange={onChange}
            onUpdate={onUpdate}
            crossOrigin="anonymous"
            stencilProps={{
              grid: true,
            }}
            stencilComponent={
              tencil === "avatar" ? CircleStencil : RectangleStencil
            }
          />
        </div>
        <div className={cn("flex h-80 w-full items-center justify-center p-5")}>
          <div
            className={cn(
              tencil === "avatar"
                ? "h-72 w-72 overflow-hidden rounded-full"
                : "h-full w-full",
            )}
          >
            <CropperPreview
              className={cn(
                tencil === "avatar" ? "preview" : "preview h-full w-full",
              )}
              ref={previewRef}
              cropper={cropperRef}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropperView;
