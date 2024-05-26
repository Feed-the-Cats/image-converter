import { useEffect } from "react";

type HeadDescription = {
  title: string;
  description: string;
};

const useDocumentHead = ({ title, description }: HeadDescription): void => {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector(
      "meta[name='description']"
    ) as HTMLMetaElement;
    const previousDescription = metaDescription?.content;
    document.title = `${title} - ${previousTitle}`;
    metaDescription.content = description;
    return () => {
      document.title = previousTitle;
      metaDescription.content = previousDescription;
    };
  }, [title]);
};

export default useDocumentHead;
