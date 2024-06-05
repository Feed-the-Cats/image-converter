import { cn } from "@/lib/utils";

type UlType = {
  children: React.ReactNode;
  className?: string;
  none?: boolean;
  decimal?: boolean;
};

export const Ul = ({
  children,
  className = "",
  none = false,
  decimal = false,
}: UlType) => {
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
