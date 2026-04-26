import { cn } from "@/lib/utils";

interface CaptionProps {
  as?: "span" | "p" | "div";
  className?: string;
  children?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

export function Caption({
  as: Component = "span",
  className,
  children,
  ...props
}: CaptionProps) {
  return (
    <Component
      className={cn("text-caption text-text-muted", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
