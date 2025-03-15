// packages
import { Metadata } from "next";

// local modules
import { fetchBookmarks } from "@/app/(main)/_fetchers";
import { isAdmin } from "@/app/(main)/_utils/is-admin";

// components
import JobCard from "@/app/(main)/_components/job/job-card";
import SectionTitle from "@/app/(main)/_components/section-title";
import { getSessionHandler } from "../_utils/get-session";

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
          <SectionTitle>Your Bookmarks</SectionTitle>
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
