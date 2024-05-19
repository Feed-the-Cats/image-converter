import {
  image64,
  imagePreview,
  imageSource,
  imageType,
  isElementsDisabled,
  origine,
} from "@/store/store";
import { useSetAtom } from "jotai";

const useClearImage = () => {
  const setBase64Image = useSetAtom(image64);
  const setImageType = useSetAtom(imageType);
  const setImageUrl = useSetAtom(imageSource);
  const setOriginePage = useSetAtom(origine);
  const setIsDisabled = useSetAtom(isElementsDisabled);
  const setPreview = useSetAtom(imagePreview);
  const setClearImage = () => {
    setImageUrl("");
    setBase64Image("");
    setImageType("");
    setPreview("");
    setOriginePage(null);
    setIsDisabled(false);
  };
  return setClearImage;
};

export { useClearImage };
