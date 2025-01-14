// packages
import { LogOutIcon } from "lucide-react";

// components
import { getSessionHandler } from "@/app/utils/get-session";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function Profile() {
  const { sessionCreatedAt, sessionExpiresAt, id, name, email } =
    await getSessionHandler();

  return (
    <div className="flex flex-col items-center space-y-10">
      <div className="flex flex-col items-center space-y-3">
        <div className="flex size-20 items-center justify-center rounded-md bg-blue-600 text-5xl font-bold text-white">
          {name?.charAt(0)}
        </div>
        <div className="text-center font-semibold">
          <h1 className="text-xl md:text-2xl lg:text-3xl">{name}</h1>
          <p className="text-base text-muted-foreground md:text-lg xl:text-xl">
            {email}
          </p>
        </div>
        <Button variant={"destructive"}>
          Sign Out
          <LogOutIcon />
        </Button>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <h2>Sessions</h2>
        <Card className="max-w-md bg-secondary p-3 font-medium">
          <p className="text-center text-sm text-muted-foreground">
            Session created at {sessionCreatedAt?.toISOString()} and session
            expires at {sessionExpiresAt?.toISOString()}
          </p>
        </Card>
      </div>
    </div>
  );
}
