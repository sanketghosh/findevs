import { ExternalLinkIcon, GithubIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 h-16 w-full bg-secondary/40">
      <div className="mx-auto flex h-full max-w-[95rem] items-center justify-between px-4 lg:px-6">
        <span className="text-lg font-semibold">findevs</span>

        <p className="text-[13px] font-medium text-muted-foreground md:text-sm">
          All copyright reserved. &copy; findevs 2025
        </p>

        <a
          href="https://github.com/sanketghosh/findevs"
          target="_blank"
          className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:underline hover:underline-offset-4"
        >
          {/* <GithubIcon size={15} /> */}
          Github
          <ExternalLinkIcon size={15} />
        </a>
      </div>
    </footer>
  );
}
