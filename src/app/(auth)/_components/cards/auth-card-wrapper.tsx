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

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText: string;
  footerHref: string;
};

export default function AuthCardWrapper({
  children,
  description,
  title,
  footerText,
  footerHref,
}: AuthCardProps) {
  return (
    <Card className="w-full shadow-lg sm:w-[400px] md:w-[450px] lg:w-[490px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Link
          href={footerHref}
          className="text-sm font-medium underline underline-offset-4"
        >
          {footerText}
        </Link>
      </CardFooter>
    </Card>
  );
}
