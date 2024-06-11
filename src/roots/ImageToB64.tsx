import { Image, ImageUri, Result } from "@/components/blocks";
import { useDocumentHead } from "@/lib/hooks";
import { image64, imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC, JSX } from "react";

const head = {
  title: "Convert Image to Base64",
  description:
    "Paste the link of an image or download it from your device and convert it to a base64 image.",
};

const ImageToB64: FC = (): JSX.Element => {
  useDocumentHead(head);
  const sourceImage = useAtomValue(imageSource);
  const imageB64 = useAtomValue(image64);

  return (
    <>
      <ImageUri isActive="imageUri" />
      {sourceImage && <Image />}
      {imageB64 && <Result />}
    </>
  );
};
export default ImageToB64;
