export const getNavLinks = async (authenticatedUserId: string) => {
  const NAV_LINKS = [
    {
      id: 0,
      href: "/",
      label: "home",
    },
    {
      id: 1,
      href: "/job/post-job",
      label: "post a job",
    },
    {
      id: 2,
      href: authenticatedUserId ? "/bookmarks" : "/not-authenticated",
      label: "bookmarks",
    },
    {
      id: 3,
      href: authenticatedUserId ? "/job/posted-jobs" : "/not-authenticated",
      label: "posted jobs",
    },
  ];

  return { NAV_LINKS };
};
