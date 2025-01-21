// packages
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

// local modules
import { NAV_LINKS } from "@/app/(main)/_data";
import { buttonVariants } from "@/components/ui/button";

// components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type DesktopNavProps = {
  id?: string;
  name?: string;
  email?: string;
  admin: boolean;
};

export default function DesktopNav({
  email,
  id,
  name,
  admin,
}: DesktopNavProps) {
  return (
    <div className="hidden items-center gap-10 md:flex">
      <nav className="flex items-center gap-4">
        {NAV_LINKS.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className="text-[13px] font-medium capitalize tracking-tight text-muted-foreground transition-all hover:text-foreground hover:underline hover:underline-offset-4 lg:text-sm"
          >
            {item.label}
          </Link>
        ))}
        {admin && (
          <Link
            href={"/admin-dashboard"}
            className="text-[13px] font-medium capitalize tracking-tight text-muted-foreground transition-all hover:text-foreground hover:underline hover:underline-offset-4 lg:text-sm"
          >
            Admin Dashboard
          </Link>
        )}
      </nav>
      {id ? (
        <div className="flex items-center gap-2">
          <Link href={"/profile"}>
            <Avatar className="border-2 bg-background">
              <AvatarFallback className="text-xl font-bold">
                {name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="select-none">
            <h2 className="text-sm font-semibold">{name}</h2>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
      ) : (
        <Link
          href={"/sign-up"}
          className={cn(
            buttonVariants({
              size: "sm",
            }),
          )}
        >
          Sign Up
        </Link>
      )}
    </div>
  );
}
