import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsAnchor = ButtonBaseProps & {
  href: string;
} & Omit<ComponentProps<"a">, "href">;

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
} & ComponentProps<"button">;

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

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
      "bg-accent text-bg-dark",
      "hover:bg-accent-hover"
    ),
    secondary: cn(
      "bg-transparent border border-border-light",
      "text-text",
      "hover:border-accent hover:text-accent"
    ),
  };

  const classes = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    // Render as anchor when href provided — spread all remaining props (including onClick)
    return (
      <a href={href} className={classes} {...(props as ComponentProps<"a">)}>
        {children}
        {arrow && <span aria-hidden="true">&rarr;</span>}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ComponentProps<"button">)}>
      {children}
      {arrow && <span aria-hidden="true">&rarr;</span>}
    </button>
  );
}
