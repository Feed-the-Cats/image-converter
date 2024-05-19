import CropperView from "@/components/blocks/CropperView";
import ImageUri from "@/components/blocks/ImageUri";
import { imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC } from "react";

const CropImage: FC = (): React.JSX.Element => {
  const sourceImage = useAtomValue(imageSource);
  return (
    <>
      <ImageUri isActive="cropper" />
      {sourceImage && <CropperView />}
    </>
  );
};

export default CropImage;
