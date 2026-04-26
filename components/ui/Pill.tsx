import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

interface PillProps extends ComponentProps<"button"> {
  active?: boolean;
  as?: "button" | "span";
}

export function Pill({
  active = false,
  as: Component = "button",
  className,
  children,
  ...props
}: PillProps) {
  return (
    <Component
      className={cn(
        "inline-flex items-center rounded-[9999px]",
        "px-md py-xs",
        "text-mono-sm",
        "transition-colors duration-fast",
        "border",
        active
          ? "bg-accent text-text-inverted border-accent"
          : "bg-transparent text-text-muted border-border-light hover:border-text hover:text-text",
        Component === "button" &&
          "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        className
      )}
      {...(Component === "button" ? props : {})}
    >
      {children}
    </Component>
  );
}
