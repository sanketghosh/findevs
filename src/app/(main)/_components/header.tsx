import { getSessionHandler } from "@/app/utils/get-session";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NAV_LINKS = [
  {
    id: 1,
    href: "/post-a-job",
    label: "post a job",
  },
  {
    id: 2,
    href: "/bookmarks",
    label: "bookmarks",
  },
];

export default async function Header() {
  const { id, name, email } = await getSessionHandler();

  return (
    <header className="h-14 w-full bg-blue-800 text-background">
      <div className="mx-auto flex h-full max-w-[110rem] items-center justify-between">
        <Link
          href={"/"}
          className="font-playfairDisplay text-xl md:text-2xl lg:text-3xl"
        >
          findevs.io
        </Link>
        <div className="flex items-center gap-10">
          <nav className="flex items-center gap-4">
            {NAV_LINKS.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                className="text-sm font-medium capitalize tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {id ? (
            <div className="flex items-center gap-2">
              <Avatar className="text-foreground">
                <AvatarFallback className="text-xl font-bold">
                  {name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-sm font-semibold">{name}</h2>
                <p className="text-xs text-secondary">{email}</p>
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
      </div>
    </header>
  );
}
