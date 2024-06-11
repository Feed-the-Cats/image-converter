import {
  BrightnessIcon,
  ContrastIcon,
  HueIcon,
  InvertIcon,
  SaturationIcon,
  SepiaIcon,
} from "@/assets/icons";
import heroImage from "@/assets/images/hero.jpeg";
import { H, Header, Ul } from "@/components/customUi";
import { cn } from "@/lib/utils";
import { homeOrigine, type HomeOrigineType } from "@/store/store";
import { useSetAtom } from "jotai";
import { Crop, FileInput, FileOutput, Filter } from "lucide-react";
import { FC, JSX, useEffect } from "react";

type HomeProps = {
  isHome: HomeOrigineType;
};

const HomeLayout: FC<HomeProps> = ({ isHome }): JSX.Element => {
  const setHomeOrigine = useSetAtom(homeOrigine);

  useEffect(() => {
    setHomeOrigine(isHome);
    return () => setHomeOrigine(null);
  });
  return (
    <div className={cn("flex h-full w-full flex-col items-center")}>
      <Header
        backgroundImage={heroImage}
        className={cn("mb-12 h-96 w-full")}
        title="Welcome to Image Converter"
        subtitle="Transform and enhance your images with ease using our online tool."
        classOverlay="bg-opacity-0"
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
        <div>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20">
                <FileOutput />
              </span>
              <H
                className={cn("m-0")}
                h={"h3"}
                variant={"primary"}
                title="Image to base64"
              />
            </div>
            <p className="ml-12">
              Importer une image depuis une adresse url ou un fichier et
              convertissez la en une chaine base64. Vous pouvez recadrer l'image
              et appliquer des filtres avant de la convertir.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20">
                <FileInput />
              </span>
              <H
                className={cn("m-0")}
                h={"h3"}
                variant={"primary"}
                title="Base64 to image"
              />
            </div>
            <p className="ml-12">
              Coller une chaine base64 et convertissez la en fichier image. Vous
              pouvez recadrer l'image et appliquer des filtres avant de la
              convertir.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20">
                <Crop />
              </span>
              <H
                className={cn("m-0")}
                h={"h3"}
                variant={"primary"}
                title="Cropper"
              />
            </div>
            <p className="ml-12">
              Importer une image depuis une adresse url ou un fichier
              directement dans le cropper, vous pouvez recadrer l'image et
              appliquer des filtres.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20">
                  <Filter />
                </span>
                <H
                  className={cn("m-0")}
                  h={"h3"}
                  variant={"primary"}
                  title="Filtres"
                />
              </div>
              <p className="ml-12">Appliquer différents filtres à vos images</p>
            </div>
            <div>
              <Ul none>
                <li className="ml-12 mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20 dark:fill-white">
                    <SaturationIcon />
                  </span>
                  <p>
                    <b>Saturation</b> : Appliquer une saturation ou une
                    désaturation à l'image
                  </p>
                </li>
                <li className="ml-12 mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20 dark:fill-white">
                    <BrightnessIcon />
                  </span>
                  <p>
                    <b>Luminosité</b> : Ajoutter ou supprimer de la luminosité à
                    l'image.
                  </p>
                </li>
                <li className="ml-12 mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20 dark:fill-white">
                    <ContrastIcon />
                  </span>
                  <p>
                    <b>Contraste</b> : Ajoutter ou supprimer du contraste à
                    l'image.
                  </p>
                </li>
                <li className="ml-12 mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20 dark:fill-white">
                    <HueIcon />
                  </span>
                  <p>
                    <b>Hue-rotation</b> : Rotation de la teinte de l'image en
                    fonction de la roue de couleurs.
                  </p>
                </li>
                <li className="ml-12 mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20 dark:fill-white">
                    <SepiaIcon />
                  </span>
                  <p>
                    <b>Sépia</b> : Appliquer un filtre sépia sur votre image.
                  </p>
                </li>
                <li className="ml-12 mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-teal-400/50 dark:bg-teal-400/20 dark:fill-white">
                    <InvertIcon />
                  </span>
                  <p>
                    <b>Inverser</b> : Inverser la couleur de l'image et donnez
                    lui un effet negatif.
                  </p>
                </li>
              </Ul>
            </div>
          </div>
        </div>
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
