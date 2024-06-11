import { H } from "@/components/customUi";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { homeOrigine } from "@/store/store";
import { useAtomValue } from "jotai";
import {
  Crop,
  FileInput,
  FileOutput,
  Filter,
  Home,
  PanelLeft,
} from "lucide-react";
import { FC, JSX } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout: FC = (): JSX.Element => {
  const isHome = useAtomValue(homeOrigine);
  return (
    <>
      <TooltipProvider>
        <div className={cn("flex min-h-screen w-full flex-col bg-muted/40")}>
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex",
            )}
          >
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={"/"}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    )}
                  >
                    <Home className="h-5 w-5" />
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Home</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={"image2b64"}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    )}
                  >
                    <FileOutput className="h-5 w-5" />
                    <span className="sr-only">image2b64</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">image2b64</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={"b64toimage"}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    )}
                  >
                    <FileInput className="h-5 w-5" />
                    <span className="sr-only">b64toimage</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">b64toimage</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to="cropper"
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                    )}
                  >
                    <Crop className="h-5 w-5" />
                    <span className="sr-only">Crop image</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Crop image</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={"filters"}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Filter className="h-5 w-5" />
                    <span className="sr-only">Filters</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Filters</TooltipContent>
              </Tooltip>
            </nav>
          </div>
          <div
            className={cn(
              "flex flex-col gap-10 sm:pl-14",
              isHome === "home" ? "gap-0" : "",
            )}
          >
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:h-auto sm:border-0 sm:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="grid gap-6 text-lg font-medium">
                    <NavLink
                      to={"/"}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </NavLink>
                    <NavLink
                      to={"image2b64"}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <FileOutput className="h-5 w-5" />
                      image2b64
                    </NavLink>
                    <NavLink
                      to={"b64toimage"}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <FileInput className="h-5 w-5" />
                      b64toimage
                    </NavLink>
                    <NavLink
                      to="cropper"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Crop className="h-5 w-5" />
                      Crop image
                    </NavLink>
                    <NavLink
                      to={"filters"}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Filter className="h-5 w-5" />
                      Filters
                    </NavLink>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="mx-auto flex h-14 w-full items-center justify-center">
                <H className={cn("text-2xl")} title={"Image Converter"} />
              </div>
            </header>
            <main id="main" className={cn("flex flex-col items-center gap-4")}>
              <Outlet />
            </main>
          </div>
        </div>
      </TooltipProvider>
      <ToastContainer />
    </>
  );
};

export default RootLayout;
