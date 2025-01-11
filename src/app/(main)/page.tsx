import { getSessionHandler } from "@/app/utils/get-session";

export default async function Home() {
  const { sessionCreatedAt, sessionExpiresAt, id, name, email } =
    await getSessionHandler();

  return (
    <div>
      <h2>{sessionCreatedAt?.toISOString()}</h2>
      <h2>{sessionExpiresAt?.toISOString()}</h2>
      <h2>{name}</h2>
      <h2>{email}</h2>
      <h2>{id}</h2>
    </div>
  );
}
