import { CropperView, ImageUri } from "@/components/blocks";
import { useDocumentHead } from "@/lib/hooks/";
import { imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC, JSX } from "react";

const head = {
  title: "Convert Image to Base64",
  description:
    "Paste the link of an image or download it from your Device and crop it or crop the image before converting it to base64 or image file.",
};

const CropImage: FC = (): JSX.Element => {
  useDocumentHead(head);
  const sourceImage = useAtomValue(imageSource);
  return (
    <>
      <ImageUri isActive="cropper" />
      {sourceImage && <CropperView asFilter={false} />}
    </>
  );
};

export default CropImage;
