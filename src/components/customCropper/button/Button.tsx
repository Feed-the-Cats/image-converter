import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC } from "react";
// import "./Button.css";

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
        "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-none bg-transparent fill-zinc-500 p-0 text-current outline-none duration-500 hover:bg-white/5 focus:bg-white/5 sm:h-8 sm:w-8",
        active ? "bg-white/5 fill-current" : "",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
