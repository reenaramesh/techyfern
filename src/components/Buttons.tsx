import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  to: string;
  icon?: boolean;
  className?: string;
};

export function PrimaryButton({
  children,
  to,
  icon = true,
  className = "",
}: ButtonProps) {
  return (
    <Link className={`button button-primary ${className}`.trim()} to={to}>
      <span>{children}</span>
      {icon && <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />}
    </Link>
  );
}

export function SecondaryButton({
  children,
  to,
  icon = false,
  className = "",
}: ButtonProps) {
  return (
    <Link className={`button button-secondary ${className}`.trim()} to={to}>
      <span>{children}</span>
      {icon && <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />}
    </Link>
  );
}
