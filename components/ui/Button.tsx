import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  href?: string;
  arrow?: boolean;
}

export function Button({
  variant = "primary",
  href,
  arrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-sm",
    "rounded-[9999px] px-lg py-[12px]",
    "font-body text-[15px] font-medium",
    "transition-colors duration-fast",
    "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
  );

  const variantStyles = {
    primary: cn(
      "bg-text text-text-inverted",
      "hover:bg-accent"
    ),
    secondary: cn(
      "bg-transparent border border-border-light",
      "text-text",
      "hover:bg-text/5"
    ),
  };

  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    // Render as anchor when href provided
    return (
      <a href={href} className={classes}>
        {children}
        {arrow && <span aria-hidden="true">&rarr;</span>}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {arrow && <span aria-hidden="true">&rarr;</span>}
    </button>
  );
}
