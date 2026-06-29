import type { ComponentProps } from "react";
import Link from "next/link";

interface AuthLinkProps extends ComponentProps<typeof Link> {
  href: string;
  children: React.ReactNode;
}

export default function AuthLink({ href, children, ...props }: AuthLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm text-[var(--gold)] hover:text-[var(--gold-l)] transition-colors duration-200 font-medium underline-offset-2 hover:underline"
      {...props}
    >
      {children}
    </Link>
  );
}
