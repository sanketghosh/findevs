// packages
import Link from "next/link";
import { ShipWheelIcon } from "lucide-react";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { isAdmin } from "@/app/(main)/_utils/is-admin";

//components
import DesktopNav from "@/app/(main)/_components/navbar/desktop-nav";
import MobileNav from "@/app/(main)/_components/navbar/mobile-nav";

export default async function Header() {
  const { id, name, email } = await getSessionHandler();
  const admin = await isAdmin();

  return (
    <header className="bg-card text-foreground sticky top-0 z-20 h-16 w-full border-b">
      <div className="mx-auto flex h-full max-w-[85rem] items-center justify-between px-4 lg:px-6">
        <Link
          href={"/"}
          className="flex items-center gap-1 text-xl font-extrabold tracking-tight uppercase"
        >
          <ShipWheelIcon size={23} />
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
