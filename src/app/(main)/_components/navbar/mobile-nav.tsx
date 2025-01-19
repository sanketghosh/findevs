// packages
import { MenuIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

// local modules
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/app/(main)/_data";

// components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";

type MobileNavProps = {
  id?: string;
  name?: string;
  email?: string;
  admin: boolean;
};

export default function MobileNav({ email, id, name, admin }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-left">findevs</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between py-10">
          <nav className="flex flex-col items-start gap-4">
            {NAV_LINKS.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                className="text-sm font-medium capitalize tracking-tight transition-all hover:underline hover:underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
            {admin && (
              <Link
                href={"/admin-dashboard"}
                className="text-sm font-medium capitalize tracking-tight transition-all hover:underline hover:underline-offset-4"
              >
                Admin Dashboard
              </Link>
            )}
          </nav>
          {id ? (
            <div className="flex items-center gap-2 rounded-md border bg-secondary p-2">
              <Link href={"/profile"}>
                <Avatar className="bg-background">
                  <AvatarFallback className="bg-background text-xl font-bold">
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
      </SheetContent>
    </Sheet>
  );
}
