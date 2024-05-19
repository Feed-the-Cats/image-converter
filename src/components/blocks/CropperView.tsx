import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClearImage } from "@/lib/hooks/useClearImage";
import toastConfig from "@/lib/toastonfig";

import { cn } from "@/lib/utils";
import { imagePreview, imageSource, imageType, origine } from "@/store/store";
import { useAtomValue, useSetAtom } from "jotai";
import { FC, useRef, useState } from "react";
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
//import "react-advanced-cropper/dist/themes/compact.css";

const CropperView: FC = (): React.JSX.Element => {
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
      cropperRef.current?.getCanvas()?.toDataURL(`image/${type}`, 1) as string
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

  /*   useEffect(() => {
    console.log("from effect preview", preview);
    console.log("from effect origine page", originePage);
    console.log("from effect type", type);
  }, [preview, originePage, type]); */

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
      <CardContent className="grid gap-4 justify-items-center">
        <div className={cn("w-full h-[600px] relative")}>
          <Cropper
            ref={cropperRef}
            src={img}
            className={cn("cropper", "w-full h-[600px]")}
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
        <div className={cn("w-full h-80 p-5 flex justify-center items-center")}>
          <div
            className={cn(
              tencil === "avatar"
                ? "w-72 h-72 rounded-full overflow-hidden"
                : "w-full h-full"
            )}
          >
            <CropperPreview
              className={cn(
                tencil === "avatar" ? "preview" : "preview w-full h-full"
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
