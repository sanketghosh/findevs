// packages
import { LogOutIcon } from "lucide-react";
import { notFound } from "next/navigation";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { CURRENCY_CURRENT_VALUE } from "@/data/currency-current-value";
import { setUserCurrencyAction } from "@/app/(main)/_actions/set-user-currency-action";
import { fetchCurrentUserCurrency } from "@/app/(main)/_fetchers";

// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FormSubmitButton from "@/components/buttons/form-submit-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/app/(main)/_components/theme-toggle";
import CustomSelect from "@/components/ui/custom-select";
import { Label } from "@/components/ui/label";
import SignOutButton from "@/app/(auth)/_components/sign-out-button";

export default async function Profile() {
  const { sessionCreatedAt, sessionExpiresAt, id, name, email, image } =
    await getSessionHandler();
  const { fetchedUserCurrency } = await fetchCurrentUserCurrency();

  if (!id && !email) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <aside className="flex h-fit w-full shrink-0 flex-col gap-4 rounded-md border p-2 md:sticky md:top-20 md:w-1/2 lg:w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>User details & settings</CardTitle>
            <CardDescription>
              Here you can access all the details of yours and change settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Avatar className="size-28 rounded-md">
                <AvatarImage src={image ? image : "/placeholder-user.webp"} />
                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-left font-semibold">
                <h1 className="text-lg font-bold lg:text-xl">{name}</h1>
                <p className="text-sm text-muted-foreground xl:text-lg">
                  {email}
                </p>
                <SignOutButton />
              </div>
            </div>
          </CardContent>
        </Card>
        <ThemeToggle />
        <Card>
          <CardHeader>
            <CardTitle>Set your currency</CardTitle>
            <CardDescription>
              Please set your preferred currency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={setUserCurrencyAction} className="space-y-4">
              <Label htmlFor="userCurrency">Currency</Label>
              <CustomSelect
                id="userCurrency"
                name="userCurrency"
                defaultValue={fetchedUserCurrency?.userCurrency || ""}
              >
                <option value="" hidden>
                  Set currency
                </option>
                {CURRENCY_CURRENT_VALUE.map((item) => (
                  <option value={item.currencyId} key={item.currencyId}>
                    {item.currencyId}
                  </option>
                ))}
              </CustomSelect>
              <FormSubmitButton className="w-full" type="submit">
                Set Currency
              </FormSubmitButton>
            </form>
          </CardContent>
        </Card>
      </aside>
      <div className="flex w-full flex-col space-y-4 rounded-md border p-2 md:w-1/2 lg:w-2/3">
        <h2 className="text-lg font-semibold xl:text-xl">Sessions</h2>
        <Separator />
        <Card className="w-full bg-card p-3 font-medium">
          <p className="text-left text-sm text-muted-foreground">
            Session created at {sessionCreatedAt?.toISOString()} and session
            expires at {sessionExpiresAt?.toISOString()}
          </p>
        </Card>
      </div>
    </div>
  );
}
