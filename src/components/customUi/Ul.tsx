import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, JSX } from "react";

interface UlType extends HTMLAttributes<HTMLUListElement> {
  none?: boolean;
  decimal?: boolean;
}

const Ul: FC<UlType> = ({
  children,
  className,
  none = false,
  decimal = false,
}): JSX.Element => {
  return (
    <ul
      className={cn(
        "mb-4 list-inside list-disc",
        none ? "list-none" : decimal ? "list-decimal" : "list-disc",
        className,
      )}
    >
      {children}
    </ul>
  );
};

export default Ul;
