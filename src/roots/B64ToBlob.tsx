import Image from "@/components/blocks/Image";
import ImageUri from "@/components/blocks/ImageUri";
import useDocumentHead from "@/lib/hooks/useDocumentHead";
import { imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC } from "react";

const head = {
  title: "Convert Image to Base64",
  description: "Paste the Base64 Image string and convert it to an image file.",
};

const B64toBlob: FC = (): React.JSX.Element => {
  useDocumentHead(head);
  const sourceImage = useAtomValue(imageSource);

  return (
    <>
      <ImageUri isActive="blob" />
      {sourceImage && <Image />}
    </>
  );
};
export default B64toBlob;
