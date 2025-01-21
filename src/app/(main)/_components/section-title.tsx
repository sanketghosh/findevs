export default function SectionTitle({ children }: { children: string }) {
  return (
    <h1 className="w-fit rounded-md border bg-secondary/50 px-4 py-2 text-base font-semibold lg:text-xl">
      {children}
    </h1>
  );
}
