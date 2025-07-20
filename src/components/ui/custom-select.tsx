// packages
import { ChevronDownIcon } from "lucide-react";
import { forwardRef } from "react";

// local modules
import { cn } from "@/lib/utils";

export default forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(function CustomSelect({ className, ...props }, ref) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "border-input bg-background ring-offset-background focus:ring-ring h-10 w-full appearance-none truncate rounded-md border py-2 pr-8 pl-3 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
        ref={ref}
      />
      <ChevronDownIcon className="absolute top-3 right-3 h-4 w-4 opacity-50" />
    </div>
  );
});
