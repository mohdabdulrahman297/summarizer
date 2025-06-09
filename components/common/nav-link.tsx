"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
export default function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        " transition-colors text-sm duration-200 text-gray-900 hover:text-blue-600  ease-in-out",
        className,
        isActive && "text-blue-600"
      )}
    >
      {children}
    </Link>
  );
}
