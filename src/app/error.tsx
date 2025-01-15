"use client";

export default function Error() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center space-y-5 px-4 py-6 text-center">
      <h1 className="text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl">
        Unexpected Error!
      </h1>
      <p className="max-w-xl text-center text-base font-medium leading-tight text-muted-foreground md:text-lg">
        Something unexpected happened go back to the home page or reload if
        still nothing improves contact us.
      </p>
      {/* <Link
        href={"/"}
        className={cn(
          buttonVariants({
            variant: "secondary",
            size: "lg",
          }),
        )}
      >
        Home Page
      </Link> */}
    </main>
  );
}
