import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdateName from "./forms/name-update";
import UpdatePassword from "./forms/password-update";
import UpdateEmail from "./forms/email-update";

type CredentialUpdateTabsProps = {
  name: string;
  email: string;
};

export default function CredentialUpdateTabs({
  name,
  email,
}: CredentialUpdateTabsProps) {
  return (
    <Tabs defaultValue="name">
      <TabsList>
        <TabsTrigger value="name" className="cursor-pointer">
          Name
        </TabsTrigger>
        <TabsTrigger value="email" className="cursor-pointer">
          Email
        </TabsTrigger>
        <TabsTrigger value="password" className="cursor-pointer">
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="name">
        <UpdateName name={name} />
      </TabsContent>
      <TabsContent value="email">
        <UpdateEmail email={email} />
      </TabsContent>
      <TabsContent value="password">
        <UpdatePassword />
      </TabsContent>
    </Tabs>
  );
}
