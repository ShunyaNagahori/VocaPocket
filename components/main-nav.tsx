"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "./ui/dropdown-menu";

const routes = [
  {
    href: "/vocabulary",
    label: "リスト",
  },
  {
    href: "/practice",
    label: "練習",
  },
  {
    href: "/profile",
    label: "プロフィール",
  },
];

interface MainNavProps {
  mobile?: boolean;
}

export function MainNav({ mobile }: MainNavProps) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <>
        {routes.map((route) => (
          <DropdownMenuItem key={route.href} asChild>
            <Link
              href={route.href}
              className={cn(
                "w-full",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              {route.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </>
    );
  }

  return (
    <nav className="flex items-center space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === route.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
