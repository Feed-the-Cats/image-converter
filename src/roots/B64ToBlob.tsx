import Image from "@/components/blocks/Image";
import ImageUri from "@/components/blocks/ImageUri";
import { imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC } from "react";

const B64toBlob: FC = (): React.JSX.Element => {
  const sourceImage = useAtomValue(imageSource);

  return (
    <>
      <ImageUri isActive="blob" />
      {sourceImage && <Image />}
    </>
  );
};
export default B64toBlob;
