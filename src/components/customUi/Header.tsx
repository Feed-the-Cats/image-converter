import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import { H } from "./H";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  classTitle?: string;
  classSubTitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  backgroundImage,
  title,
  subtitle,
  className,
  classTitle,
  classSubTitle,
}) => {
  return (
    <header
      className={cn(
        "relative flex h-64 flex-col items-center justify-center bg-cover bg-center text-white",
        className,
      )}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      role="banner"
      aria-labelledby="header-title"
      aria-describedby="header-subtitle"
    >
      <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-50" />
      <div className="relative z-10 text-center">
        <H
          id="header-title"
          className={cn("m-0 text-4xl font-bold", classTitle)}
          title={title}
        />

        {subtitle && (
          <p id="header-subtitle" className={cn("mt-2 text-lg", classSubTitle)}>
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
