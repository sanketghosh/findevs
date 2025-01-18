// packages
import Link from "next/link";

// local modules
import { getSessionHandler } from "@/app/utils/get-session";

//components
import DesktopNav from "@/app/(main)/_components/navbar/desktop-nav";
import MobileNav from "@/app/(main)/_components/navbar/mobile-nav";
import { isAdmin } from "../_utils/is-admin";

export default async function Header() {
  const { id, name, email } = await getSessionHandler();
  const admin = await isAdmin();

  return (
    <header className="sticky top-0 z-20 h-16 w-full bg-secondary text-foreground">
      <div className="mx-auto flex h-full max-w-[95rem] items-center justify-between px-4 lg:px-6">
        <Link
          href={"/"}
          className="font-playfairDisplay text-xl font-bold md:text-2xl lg:text-3xl"
        >
          findevs
        </Link>
        <DesktopNav email={email} id={id} name={name} admin={admin} />
        <div className="block md:hidden">
          <MobileNav email={email} id={id} name={name} admin={admin} />
        </div>
      </div>
    </header>
  );
}
