import { GithubIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 h-16 w-full border-t-2 bg-secondary">
      <div className="mx-auto flex h-full max-w-[95rem] items-center justify-between px-4 lg:px-6">
        <span className="text-lg font-semibold">findevs</span>

        <p className="text-sm font-medium text-muted-foreground">
          All copyright reserved. &copy; findevs 2025
        </p>

        <a
          href="https://github.com/sanketghosh/findevs"
          target="_blank"
          className="flex items-center gap-1 text-sm font-semibold lowercase text-muted-foreground hover:underline hover:underline-offset-4"
        >
          Github
        </a>
      </div>
    </footer>
  );
}
