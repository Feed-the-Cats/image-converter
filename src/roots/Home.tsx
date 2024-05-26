import { cn } from "@/lib/utils";
import React, { FC } from "react";

const Home: FC = (): React.JSX.Element => {
  return (
    <div
      className={cn(
        "flex flex-col h-screen w-full items-center justify-center"
      )}
    >
      <header className="w-full text-white text-center py-4">
        <h1 className="text-3xl">Welcome to Image Converter</h1>
      </header>
      <div className="max-w-4xl  p-4">
        <p className="mb-4">
          Transform and enhance your images with ease using our online tool.
          Whether you need to convert images between different formats, apply
          artistic filters, or crop images for a perfect result, Image Converter
          is here for you.
        </p>

        <h2 className="text-2xl text-sky-400 mb-2">Main Features:</h2>

        <h3 className="text-xl text-sky-400 mt-4 mb-2">Image Conversion</h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>From base64 to file</strong>: Easily convert your base64
            image strings into usable image files.
          </li>
          <li>
            <strong>From file to base64</strong>: Transform your image files
            into base64 strings for easy integration into your web projects and
            applications.
          </li>
        </ul>

        <h3 className="text-xl text-sky-400 mt-4 mb-2">Image Editing</h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Filter application</strong>: Add an artistic touch to your
            photos with our varied and intuitive filters.
          </li>
          <li>
            <strong>Crop</strong>: Adjust the framing of your images to
            highlight important details.
          </li>
        </ul>

        <h3 className="text-xl text-sky-400 mt-4 mb-2">Download and Edit</h3>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Download an image</strong>: Import your images to edit them
            directly on our platform.
          </li>
          <li>
            <strong>Filters and cropping</strong>: Apply filters or crop your
            images without needing to convert them.
          </li>
        </ul>

        <h2 className="text-2xl text-sky-400 mt-4 mb-2">
          Why Choose Image Converter?
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Ease of use</strong>: Our user-friendly interface allows you
            to transform and enhance your images in just a few clicks.
          </li>
          <li>
            <strong>Flexibility</strong>: Whether you are a developer, designer,
            or photography enthusiast, our tool meets your specific needs.
          </li>
        </ul>

        <h2 className="text-2xl text-sky-400 mt-4 mb-4">Get Started Now</h2>
      </div>
    </div>
  );
};

export default Home;
