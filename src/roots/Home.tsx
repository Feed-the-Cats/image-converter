import HomeLayout from "@/components/blocks/HomeLayout";
import { useDocumentHead } from "@/lib/hooks/";
import { FC, JSX } from "react";

const head = {
  title: "Image Converter - Home",
  description:
    "Convert Image to Base64, Convert Image to Blob, Convert Image to Data URL and Convert Image to File. You Can also convert images between different formats, apply artistic filters, crop images for a perfect result, and more.",
};

const Home: FC = (): JSX.Element => <HomeLayout isHome={"home"} />;
useDocumentHead(head);
export default Home;
