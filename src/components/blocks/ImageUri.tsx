import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClearImage } from "@/lib/hooks/useClearImage";
import toastConfig from "@/lib/toastonfig";
import { cn } from "@/lib/utils";
import {
  image64,
  imagePreview,
  imageSource,
  imageType,
  isElementsDisabled,
  origine,
} from "@/store/store.ts";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Upload } from "lucide-react";
import {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

type isActiveType = { isActive: "imageUri" | "cropper" | "blob" };
type imgToBlobType = (imageUrl: any, isInput?: boolean) => Promise<void>;

const ImageUri: FC<isActiveType> = ({ isActive }): React.JSX.Element => {
  const setBase64Image = useSetAtom(image64);
  const [type, setImageType] = useAtom(imageType);
  const [imageUrl, setImageUrl] = useAtom(imageSource);
  const preview = useAtomValue(imagePreview);
  const [originePage, setOriginePage] = useAtom(origine);
  const [isDisabled, setIsDisabled] = useAtom(isElementsDisabled);
  const setClearImage = useClearImage();
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      const reader = new FileReader();
      const [, type] = file.type.split("/");
      setImageType(type);
      console.log(type);
      setImageUrl("");
      setBase64Image("");
      setOriginePage(isActive);
      setIsDisabled(originePage !== isActive);
      inputRef.current?.focus();
      inputRef.current?.blur();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        setImageUrl(result);
      };
      reader.onerror = (error) => {
        toast.error("An error has occurred :", toastConfig);
        console.log(error);
      };
    },
    [
      setImageType,
      setImageUrl,
      setBase64Image,
      setOriginePage,
      isActive,
      setIsDisabled,
      originePage,
    ],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const imgToBlob: imgToBlobType = async (imageUrl, isInput = false) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      const [, type] = blob.type.split("/");
      setImageType(type);
      /* console.log(type); */
      reader.onload = () => {
        const base64String = reader.result as string;
        isInput ? setImageUrl(base64String) : setBase64Image(base64String);
      };
      reader.readAsDataURL(blob);
      if (!isInput) toast.success("Image converted", toastConfig);
    } catch (error) {
      toast.error("An error has occurred :", toastConfig);
      //console.error("An error has occurred :", error);
    }
  };

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value.length && /data:image/.test(value)) {
      setImageType(value.split(";")[0].split("/")[1]);
    }
    if (value.length && !/data:image/.test(value)) {
      imgToBlob(value, true);
    }

    /* getImageType(value); */
    setImageUrl(value);
    setOriginePage(isActive);
    /*  console.log("imput change", originePage); */
    setIsDisabled(originePage !== isActive);
  };

  const inputClick = ({ currentTarget }: MouseEvent<HTMLInputElement>) => {
    if (currentTarget.value.length) currentTarget.value = "";
    /* setBase64Image(""); */
    setClearImage();
  };

  const handleConvertClick = async () => {
    if (!imageUrl) return;
    if (/data:image/.test(imageUrl)) {
      setBase64Image(imageUrl);
      return;
    }
    imgToBlob(imageUrl);
  };

  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `image.${type}`;
    a.click();
    a.remove();
    URL.revokeObjectURL(imageUrl);
    setClearImage();
    toast.success("Start image download", toastConfig);
  };

  useEffect(() => {
    originePage?.length
      ? originePage === isActive
        ? setIsDisabled(false)
        : setIsDisabled(true)
      : null;
  }, [originePage, isActive, setIsDisabled]);

  useEffect(() => {
    preview.length ? setImageUrl(preview) : null;
  }, [preview, setImageUrl]);

  return (
    <>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          {isActive !== "blob" ? (
            <div
              {...getRootProps()}
              id="dropzone"
              className={cn(
                "relative mb-8 mt-1.5 flex h-[200px] w-[200px] flex-col items-center justify-center gap-4 self-center overflow-hidden text-center after:absolute after:inset-0 after:left-0 after:top-0 after:h-[200px] after:w-[200px] after:[mask:--drag-icon]",
                isDragActive
                  ? "text-foreground after:bg-foreground"
                  : "text-muted-foreground after:bg-muted-foreground",
                isDisabled ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              <input
                {...getInputProps()}
                type="file"
                accept="image/png, image/jpeg"
                disabled={isDisabled}
              />
              <Upload
                className={cn(
                  "h-16 w-16",
                  isDragActive
                    ? "stroke-foreground"
                    : "stroke-muted-foreground",
                )}
                /* style={isDragActive ? { stroke: "#ffffff" } : {}} */
              />
              {isDragActive ? (
                <p>Drag the files here !</p>
              ) : (
                <div>
                  <p>Drop files here.</p>
                  <p>or click to select files.</p>
                </div>
              )}
            </div>
          ) : null}
          <CardTitle className="text-2xl">Image url</CardTitle>
          <CardDescription>
            {isActive === "imageUri" || isActive === "cropper"
              ? "Past your image link."
              : "Past your image base64."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="imgString">Link</Label>
            <Input
              ref={inputRef}
              id="imgString"
              type="text"
              placeholder="http://images.com/imgs/f5f5f5f5f5f5f.jpg"
              value={imageUrl}
              onChange={handleInputChange}
              onClick={inputClick}
              required
              disabled={isDisabled}
            />
          </div>
        </CardContent>
        <CardFooter className="gap-1">
          {isActive === "imageUri" && (
            <>
              <Button
                disabled={isDisabled}
                className="w-full"
                onClick={handleConvertClick}
              >
                Convert Image
              </Button>
              <Button
                disabled={isDisabled}
                className={cn(
                  "text-background-invert w-full bg-teal-500/50 hover:bg-teal-500 hover:text-black dark:bg-teal-400/20 dark:hover:bg-teal-500 dark:hover:text-black",
                )}
                onClick={setClearImage}
              >
                Clear
              </Button>
            </>
          )}
          {isActive === "blob" && (
            <>
              <Button
                disabled={isDisabled}
                className="w-full"
                onClick={downloadImage}
              >
                Download image
              </Button>
              <Button
                disabled={isDisabled}
                className={cn(
                  "text-background-invert w-full bg-teal-500/50 hover:bg-teal-500 hover:text-black dark:bg-teal-400/20 dark:hover:bg-teal-500 dark:hover:text-black",
                )}
                onClick={setClearImage}
              >
                Clear
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ImageUri;
