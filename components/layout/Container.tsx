import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

interface ContainerProps extends ComponentProps<"div"> {
  /** "default" = 1200px max-width, "wide" = 1440px for full-bleed media */
  size?: "default" | "wide";
}

export function Container({
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        "px-xl md:px-xl",      /* 32px gutter desktop */
        "max-sm:px-[20px]",    /* 20px gutter mobile */
        size === "default" ? "max-w-[1200px]" : "max-w-[1440px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
