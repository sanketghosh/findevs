// packages
import { MenuIcon, ShipWheelIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

// local modules
import { cn } from "@/lib/utils";
import { getNavLinks } from "@/app/(main)/_utils/get-nav-links";

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
import { getSessionHandler } from "../../_utils/get-session";

type MobileNavProps = {
  id?: string;
  name?: string;
  email?: string;
  admin: boolean;
};

export default async function MobileNav({
  email,
  id,
  name,
  admin,
}: MobileNavProps) {
  const { id: authenticatedUserId } = await getSessionHandler();
  const { NAV_LINKS } = await getNavLinks(authenticatedUserId!);

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "secondary",
          }),
          "cursor-pointer",
        )}
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-1.5 text-left font-extrabold uppercase">
            <ShipWheelIcon size={20} />
            <p>findevs</p>
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col justify-between px-4 py-10">
          <nav className="flex flex-col items-start gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                /* className="text-sm font-medium tracking-tight capitalize transition-all hover:underline hover:underline-offset-4" */
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "capitalize",
                )}
              >
                {item.label}
              </Link>
            ))}
            {admin && (
              <Link
                href={"/admin-dashboard"}
                /* className="text-sm font-medium tracking-tight capitalize transition-all hover:underline hover:underline-offset-4" */
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "capitalize",
                )}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>
          {id ? (
            <div className="bg-secondary flex items-center gap-2 rounded-md border p-2">
              <Link href={"/profile"}>
                <Avatar className="bg-background">
                  <AvatarFallback className="bg-background text-xl font-bold">
                    {name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="select-none">
                <h2 className="text-sm font-semibold">{name}</h2>
                <p className="text-muted-foreground text-xs">{email}</p>
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
