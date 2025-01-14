import { GithubIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="h-16 w-full bg-secondary">
      <div className="mx-auto flex h-full max-w-[95rem] items-center justify-between px-4 lg:px-6">
        <span className="text-lg font-semibold">findevs</span>

        <p className="text-sm font-medium text-muted-foreground">
          All copyright reserved. &copy; findevs 2025
        </p>

        <div className="w-fit rounded-md border bg-background p-2">
          <a
            href="https://github.com/sanketghosh/findevs"
            target="_blank"
            className="flex items-center gap-1 text-sm font-medium"
          >
            <GithubIcon size={17} />
            Source Code
          </a>
        </div>
      </div>
    </footer>
  );
}
