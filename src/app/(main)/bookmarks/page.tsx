import JobCard from "../_components/job/job-card";
import SectionTitle from "../_components/section-title";
import { fetchBookmarks } from "../_fetchers";
import { isAdmin } from "../_utils/is-admin";

export default async function Bookmarks() {
  const { bookmarks } = await fetchBookmarks();
  const admin = await isAdmin();

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
