// packages
import { Metadata } from "next";

// local modules
import { fetchBookmarks } from "@/app/(main)/_fetchers";
import { isAdmin } from "@/app/(main)/_utils/is-admin";

// components
import JobCard from "@/app/(main)/_components/job/job-card";
import SectionTitle from "@/app/(main)/_components/section-title";
import { getSessionHandler } from "../_utils/get-session";
import { BookMarkedIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "All your bookmarks are here.",
};

export default async function Bookmarks() {
  const admin = await isAdmin();
  const { bookmarks } = await fetchBookmarks();

  return (
    <div className="space-y-4">
      {bookmarks.length > 0 ? (
        <>
          <div className="space-y-1.5 py-2">
            <div className="flex items-center gap-1">
              <BookMarkedIcon size={20} />
              <h2 className="text-lg font-semibold">Bookmarks</h2>
            </div>
            <p className="text-muted-foreground text-sm leading-tight font-medium">
              Access all your bookmarks here. Click on the bookmark button to
              un-bookmark it.
            </p>
          </div>
          <Separator />
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {bookmarks.map((item) => (
              <JobCard key={item.id} job={item.job} admin={admin} />
            ))}
          </div>
        </>
      ) : (
        <p>You have no bookmarks yet</p>
      )}
    </div>
  );
}
