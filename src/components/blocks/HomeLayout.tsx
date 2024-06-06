import { H } from "@/components/customUi/H";
import Header from "@/components/customUi/Header";
import { Ul } from "@/components/customUi/Ul";
import { cn } from "@/lib/utils";
import React, { FC, useEffect } from "react";

import heroImage from "@/assets/images/hero.jpeg";
import { origine, type OrigineType } from "@/store/store";
import { useSetAtom } from "jotai";

type HomeProps = {
  isActive: OrigineType;
};

const HomeLayout: FC<HomeProps> = ({ isActive }): React.JSX.Element => {
  const setOriginePage = useSetAtom(origine);

  useEffect(() => {
    setOriginePage(isActive);
    console.log(isActive);
    return () => setOriginePage(null);
  });
  return (
    <div className={cn("flex h-full w-full flex-col items-center")}>
      {/*       <header className="w-full py-4 text-center">
        <H h="h1" className="px-4 my-0" title="Welcome to Image Converter" />
      </header> */}

      <Header
        backgroundImage={heroImage}
        className={cn("mb-12 h-96 w-full")}
        title="Welcome to Image Converter"
        subtitle="Transform and enhance your images with ease using our online tool."
      />
      <H h="h1" className="mb-6 mt-0 px-4" title="In Image Converter" />
      <div className="max-w-4xl px-6 sm:px-12 sm:py-4 lg:p-4">
        <p className="mb-4">
          Transform and enhance your images with ease using our online tool.
          Whether you need to convert images between different formats, apply
          artistic filters, or crop images for a perfect result, Image Converter
          is here for you.
        </p>
        <H h="h2" title="Main Features :" variant="primary" />
        <H h="h3" title="Image Conversion" variant="primary" />
        <Ul>
          <li>
            <strong>From base64 to file</strong>: Easily convert your base64
            image strings into usable image files.
          </li>
          <li>
            <strong>From file to base64</strong>: Transform your image files
            into base64 strings for easy integration into your web projects and
            applications.
          </li>
        </Ul>
        <H h="h3" title="Image Editing" variant="primary" />
        <Ul>
          <li>
            <strong>Filter application</strong>: Add an artistic touch to your
            photos with our varied and intuitive filters.
          </li>
          <li>
            <strong>Crop</strong>: Adjust the framing of your images to
            highlight important details.
          </li>
        </Ul>
        <H h="h3" title="Download and Edit" variant="primary" />
        <Ul>
          <li>
            <strong>Download an image</strong>: Import your images to edit them
            directly on our platform.
          </li>
          <li>
            <strong>Filters and cropping</strong>: Apply filters or crop your
            images without needing to convert them.
          </li>
        </Ul>
        <H h="h3" title="Why Choose Image Converter ?" variant="primary" />
        <Ul>
          <li>
            <strong>Ease of use</strong>: Our user-friendly interface allows you
            to transform and enhance your images in just a few clicks.
          </li>
          <li>
            <strong>Flexibility</strong>: Whether you are a developer, designer,
            or photography enthusiast, our tool meets your specific needs.
          </li>
        </Ul>
        <H
          h="h2"
          className="mb-4 mt-4"
          title="Get Started Now"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default HomeLayout;