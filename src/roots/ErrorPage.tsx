import { H } from "@/components/customUi";
import { Button } from "@/components/ui/button";
import { useDocumentHead } from "@/lib/hooks/";
import { FC, JSX } from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const head = {
  title: "Image Converter - Error",
  description:
    "You are seeing this because page is not found. Please go back to the home page.",
};

const ErrorPage: FC = (): JSX.Element => {
  const error = useRouteError();
  const isError = isRouteErrorResponse(error);
  const navigate = useNavigate();
  const backToHome = () => navigate("/");

  useDocumentHead(head);

  return (
    /*font-size: 100px;
  font-weight: 900;*/
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <H className="text-8xl" title="Oops!" />
      <p>Sorry, an unexpected error has occurred.</p>
      {isError ? (
        <>
          <H h="h1" className="text-8xl font-black" title={`${error.status}`} />
          <br />
          <H h="h1" className="text-3xl" title={`${error.statusText}`} />
          <br />
        </>
      ) : null}
      <div>
        <Button
          className="w-32 p-4 text-base"
          variant={"teal"}
          onClick={backToHome}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
