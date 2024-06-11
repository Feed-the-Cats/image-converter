import {CropperView} from "@/components/blocks";
import {useDocumentHead} from "@/lib/hooks";
import { imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC, JSX } from "react";

const head = {
  title: "Convert Image to Base64",
  description:
    "Paste the link of an image or download it from your Device and apply filters or apply filters before converting your image to base64 or image file.",
};

const Filters: FC = (): JSX.Element => {
  useDocumentHead(head);
  const sourceImage = useAtomValue(imageSource);
  return <>{sourceImage && <CropperView asFilter={true} />}</>;
};

export default Filters;
