import B64toBlob from "@/roots/B64ToBlob";
import CropImage from "@/roots/CropImage";
import Filters from "@/roots/Filters";
import Home from "@/roots/Home";
import ImageToB64 from "@/roots/ImageToB64";
import RootLayout from "@/roots/RootLayout";
import { FC } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "image2b64",
        element: <ImageToB64 />,
      },
      {
        path: "cropper",
        element: <CropImage />,
      },
      {
        path: "b64toimage",
        element: <B64toBlob />,
      },
      {
        path: "filters",
        element: <Filters />,
      },
    ],
  },
]);

const App: FC = (): React.JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
