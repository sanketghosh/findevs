// packages
import { Loader2Icon } from "lucide-react";

/// components
import { Button } from "@/components/ui/button";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader2Icon size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
}
