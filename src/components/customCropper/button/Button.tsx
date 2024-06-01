import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC } from "react";
import "./Button.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Button: FC<Props> = ({
  className,
  active,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "image-editor-button",
        active ? "image-editor-button--active" : "",
        className
      )}
      {...props}
    >
      {/*  {active ? "true" : "false"} */}
      {children}
    </button>
  );
};
