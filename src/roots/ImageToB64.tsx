import Image from "@/components/blocks/Image";
import ImageUri from "@/components/blocks/ImageUri";
import Result from "@/components/blocks/Result";
import { image64, imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC } from "react";

const ImageToB64: FC = (): React.JSX.Element => {
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
