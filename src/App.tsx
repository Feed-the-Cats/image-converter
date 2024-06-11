import {
  B64toBlob,
  CropImage,
  ErrorPage,
  Filters,
  Home,
  ImageToB64,
  RootLayout,
} from "@/roots";
import { FC, JSX } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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

const App: FC = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;
