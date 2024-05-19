import Canvas from "@/components/blocks/Canvas";
import { imageSource } from "@/store/store";
import { useAtomValue } from "jotai";
import { FC } from "react";

const Filters: FC = (): React.JSX.Element => {
  const sourceImage = useAtomValue(imageSource);
  return <>{sourceImage && <Canvas src={sourceImage} />}</>;
};

export default Filters;
