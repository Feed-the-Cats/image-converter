import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useClearImage } from "@/lib/hooks/useClearImage";
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
//import "react-advanced-cropper/dist/themes/compact.css";

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
  // const [, setCoordinate] = useState<Coordinates | null>(null);
  // const [, setCropperImage] = useState<string | undefined>("");
  // const [tencil, setTencil] = useState<"circle" | "square">("square");
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

  /*   useEffect(() => {
    asFilter ? setIsFilterActive(true) : setIsFilterActive(false);

    console.log("isFilterActive from cropperView", isFilterActive);
    return () => {
      setIsFilterActive(false);
    };
  }, [isFilterActive]); */

  /* 
  const onChange = (cropper: CropperRef) => {
    setCoordinate(cropper.getCoordinates());
    setCropperImage(cropper.getCanvas()?.toDataURL());
    }; */

  /*   const onUpdate = () => {
      previewRef.current?.refresh();
    };
   */

  /*   useEffect(() => {
    console.log("from effect preview", preview);
    console.log("from effect origine page", originePage);
    console.log("from effect type", type);
  }, [preview, originePage, type]); */

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl">Crop image</CardTitle>
        {!isFilterActive ? (
          <div className={cn("flex gap-2")}>
            {/*             <Button
              className={cn("w-full")}
              onClick={() => setTencil("square")}
            >
              square
            </Button>
            <Button
              className={cn("w-full")}
              onClick={() => setTencil("circle")}
            >
              circle
            </Button> */}

            {/* {originePage === "cropper" ? (
              <Button
                className={cn(actionButtonsClass)}
                onClick={downloadImage}
              >
                download
              </Button>
            ) : (
              <Button
                className={cn(actionButtonsClass)}
                onClick={downloadImage}
              >
                crop
              </Button>
            )} */}
            <Button
              className={cn(
                "text-background-invert w-full bg-[var(--background-action-button)] hover:bg-orange-800 hover:text-background dark:bg-orange-800/30 dark:hover:bg-orange-800 dark:hover:text-white",
              )}
              onClick={setClearImage}
            >
              Clear
            </Button>
          </div>
        ) : null}
      </CardHeader>
      {/* "grid gap-4 justify-items-center" */}
      <CardContent className="flex flex-col justify-items-center gap-4">
        <div className={cn("relative h-[600px] w-full")}>
          {/*           <Cropper
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
              tencil === "circle" ? CircleStencil : RectangleStencil
            }
          /> */}
          <ImageEditor
            /*   img={img} */
            allRefs={allRefs}
            downloadImage={downloadImage}
          />
        </div>
        <div className={cn("flex h-80 w-full items-center justify-center p-5")}>
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
