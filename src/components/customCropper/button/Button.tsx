import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC, JSX } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const Button: FC<Props> = ({
  className,
  active,
  children,
  ...props
}): JSX.Element => {
  return (
    <button
      className={cn(
        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent fill-zinc-500 p-0 text-current outline-none duration-500 hover:bg-white/5 focus:bg-white/5 sm:h-11 sm:w-11",
        active ? "bg-white/5 fill-current" : "",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
