import Link from "next/link";
/** COMPONENTS */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShipWheelIcon } from "lucide-react";

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText?: string;
  footerHref?: string;
} & React.ComponentPropsWithRef<"div">;

export default function CardWrapper({
  children,
  description,
  title,
  footerText,
  footerHref,
  className,
}: AuthCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footerText && (
        <CardFooter>
          {footerHref ? (
            <Link
              href={footerHref}
              className="text-sm font-medium underline underline-offset-4"
            >
              {footerText}
            </Link>
          ) : (
            <p>{footerText}</p>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
