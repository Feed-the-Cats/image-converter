import { useClearImage } from "@/lib/hooks/useClearImage";
import toastConfig from "@/lib/toastonfig";
import { imagePreview, imageSource, imageType, origine } from "@/store/store";
import { useAtomValue, useSetAtom } from "jotai";
import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
} from "react";
import { CropperPreviewRef, CropperRef } from "react-advanced-cropper";
import { toast } from "react-toastify";
import { ImageEditor } from "../customCropper/imageEditor/ImageEditor";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type propsType = ComponentPropsWithoutRef<"canvas">;
export const Canvas = ({
  src,
  ...props
}: { src: string | null } & propsType): React.JSX.Element => {
  const originePage = useAtomValue(origine);
  const type = useAtomValue(imageType);
  const setPreview = useSetAtom(imagePreview);
  const img = useAtomValue(imageSource);
  const previewRef = useRef<CropperPreviewRef>(null);
  const cropperRef = useRef<CropperRef>(null);
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [value, setValue] = React.useState(0);
  const setClearImage = useClearImage();

  const allRefs = {
    cropperRef: cropperRef,
    previewRef: previewRef,
  };

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(+target.value);
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
    console.log(cropperRef.current);
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

  useEffect(() => {
    if (src) {
      const canvas = ref.current;
      if (!canvas) return;
      const img = new Image();
      img.src = src;
      const ctx = canvas.getContext("2d");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      if (!ctx) return;
      ctx.filter = `grayscale(${value}%)`;
      ctx.drawImage(img, 0, 0);
    }
  }, [src, value]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl">Filters</CardTitle>
      </CardHeader>
      <CardContent className="grid justify-items-center gap-4">
        {/*         <div className={cn("min-w-28 max-w-4xl")}>
          <canvas {...props} className={cn("w-full h-auto")} ref={ref}></canvas>
        </div>

        <div className={cn("min-w-28 max-w-[32rem] w-full h-5 bg-orange-600")}>
          <div className={cn("w-full h-full bg-red-600")}>
            <input
              className={cn("w-[90%]")}
              type="range"
              name="test"
              id="test"
              max="+100"
              min="0"
              step={"1"}
              value={value}
              onChange={onChange}
            />
            <span>{value}</span>
          </div>
        </div> */}
        <ImageEditor allRefs={allRefs} downloadImage={downloadImage} />
      </CardContent>
    </Card>
  );
};

export default Canvas;
