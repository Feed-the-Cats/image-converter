import Canvas from "@/components/blocks/Canvas";
import useDocumentHead from "@/lib/hooks/useDocumentHead";
import { imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC } from "react";

const head = {
  title: "Convert Image to Base64",
  description:
    "Paste the link of an image or download it from your Device and apply filters or apply filters before converting your image to base64 or image file.",
};

const Filters: FC = (): React.JSX.Element => {
  useDocumentHead(head);
  const sourceImage = useAtomValue(imageSource);
  return <>{sourceImage && <Canvas src={sourceImage} />}</>;
};

export default Filters;
