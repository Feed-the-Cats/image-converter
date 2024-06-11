import { Image, ImageUri } from "@/components/blocks";
import { useDocumentHead } from "@/lib/hooks";
import { imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC, JSX } from "react";

const head = {
  title: "Convert Image to Base64",
  description: "Paste the Base64 Image string and convert it to an image file.",
};

const B64toBlob: FC = (): JSX.Element => {
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
