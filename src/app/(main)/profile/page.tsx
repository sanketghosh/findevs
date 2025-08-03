// packages
import { notFound } from "next/navigation";

// local modules
import { getSessionHandler } from "@/app/(main)/_utils/get-session";
import { CURRENCY_CURRENT_VALUE } from "@/data/currency-current-value";
import { setUserCurrencyAction } from "@/app/(main)/_actions/set-user-currency-action";
import { fetchCurrentUserCurrency } from "@/app/(main)/_fetchers";

// components
import FormSubmitButton from "@/components/buttons/form-submit-button";
import ThemeToggle from "@/app/(main)/_components/theme-toggle";
import CustomSelect from "@/components/ui/custom-select";
import { Label } from "@/components/ui/label";
import SignOutButton from "@/app/(auth)/_components/sign-out-button";
import CredentialUpdateTabs from "@/app/(main)/profile/_components/credential-update-tabs";
import CardWrapper from "@/components/card-wrapper";

/* export const metadata: Metadata = {
  title: `${name}`,
  description: `Hey ${name}, welcome to you profile. Manage your profile and change settings.`,
}; */

export default async function Profile() {
  const { sessionCreatedAt, sessionExpiresAt, id, name, email } =
    await getSessionHandler();

  const { fetchedUserCurrency } = await fetchCurrentUserCurrency();

  if (!id && !email) {
    return notFound();
  }

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="flex h-fit w-full shrink-0 flex-col gap-4 rounded-xl border p-2 md:sticky md:top-20 md:w-1/2 lg:w-1/3">
          <CardWrapper
            title="User details & settings"
            description="Here you can access all the details of yours and change settings"
          >
            <div className="mb-4 flex items-center gap-2">
              {/* <Avatar className="size-24 rounded-md">
              <AvatarImage src={image ? image : "/placeholder-user.webp"} />
              <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
            </Avatar> */}
              <div className="bg-background flex size-14 shrink-0 items-center justify-center rounded-xl border text-3xl font-extrabold md:size-16">
                {name?.charAt(0)}
              </div>
              <div className="text-left leading-tight">
                <h1 className="line-clamp-1 text-base font-bold md:text-lg">
                  {name}
                </h1>
                <p className="text-muted-foreground line-clamp-1 text-sm font-medium md:text-base">
                  {email}
                </p>
              </div>
            </div>
            <SignOutButton />
          </CardWrapper>
          <ThemeToggle />
          <CardWrapper
            title="Set your currency"
            description="Please set your preferred currency"
          >
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
          </CardWrapper>
        </aside>
        <div className="flex w-full flex-col space-y-4 rounded-xl border p-4 md:w-1/2 lg:w-2/3">
          <CredentialUpdateTabs email={email!} name={name!} />
          <div>
            <h2 className="bg-card rounded-xl border px-4 py-4 text-sm font-medium">
              Session started at {sessionCreatedAt?.toLocaleString()} and
              expires at {sessionExpiresAt?.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
