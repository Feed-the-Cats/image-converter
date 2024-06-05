import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const headingVariants = cva({
  variants: {
    hs: {
      h1: "my-5 text-3xl",
      h2: "mb-2 mt-4 text-2xl",
      h3: "mb-2 mt-4 text-xl",
      h4: "mb-2 mt-4 text-lg",
      h5: "mb-2 mt-4 text-base",
      h6: "mb-2 mt-4 text-sm",
    },
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  title: string;
  primary: boolean;
}

type HType = {
  h: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  title: string;
  className?: string;
  primary?: boolean;
};

export const H = ({ h, title, className = "", primary }: HType) => {
  /*  switch (h) {
    case "h1":
      return (
        <h1
          className={cn(
            "my-5 text-3xl",
            primary ? "text-teal-700 dark:text-teal-400" : "",
            className,
          )}
        >
          {title}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={cn(
            "mb-2 mt-4 text-2xl",
            primary ? "text-teal-700 dark:text-teal-400" : "",
            className,
          )}
        >
          {title}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn(
            "mb-2 mt-4 text-xl",
            primary ? "text-teal-700 dark:text-teal-400" : "",
            className,
          )}
        >
          {title}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={cn(
            "mb-2 mt-4 text-lg",
            primary ? "text-teal-700 dark:text-teal-400" : "",
            className,
          )}
        >
          {title}
        </h4>
      );
    case "h5":
      return (
        <h5
          className={cn(
            "mb-2 mt-4 text-base",
            primary ? "text-teal-700 dark:text-teal-400" : "",
            className,
          )}
        >
          {title}
        </h5>
      );
    case "h6":
      return (
        <h6
          className={cn(
            "mb-2 mt-4 text-sm",
            primary ? "text-teal-700 dark:text-teal-400" : "",
            className,
          )}
        >
          {title}
        </h6>
      );
    default:
      return (
        <h1
          className={cn(
            "mb-2 mt-4 text-xs",
            primary ? "text-teal-700 dark:text-teal-400" : "",
            className,
          )}
        >
          {title}
        </h1>
      );
  } */
  const H = h;
  return (
    <H
      className={cn(
        "my-5 text-3xl",
        primary ? "text-teal-700 dark:text-teal-400" : "",
        className,
      )}
    >
      {title}
    </H>
  );
};
