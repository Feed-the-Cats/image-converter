import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { FC, HTMLAttributes, JSX, forwardRef } from "react";

const headingVariants = cva("heading", {
  variants: {
    heading: {
      h1: "my-5 text-3xl",
      h2: "mb-2 mt-4 text-2xl",
      h3: "mb-2 mt-4 text-xl",
      h4: "mb-2 mt-4 text-lg",
      h5: "mb-2  mt-4 text-base",
      h6: "mb-2 mt-4 text-sm",
    },
    variant: {
      default: "text-foreground",
      primary: "text-teal-700 dark:text-teal-400",
      destructive: "text-destructive",
    },
  },
  compoundVariants: [{ heading: "h1", variant: "default" }],
  defaultVariants: {
    heading: "h1",
    variant: "default",
  },
});

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  title: string;
  h?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const H: FC<HeadingProps> = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, h, variant, title, ...props }, ref): JSX.Element => {
    const Head = !h ? "h1" : h;

    return (
      <Head
        className={cn(headingVariants({ heading: h, variant, className }))}
        ref={ref}
        {...props}
      >
        {title}
      </Head>
    );
  },
);

export { H, headingVariants };
