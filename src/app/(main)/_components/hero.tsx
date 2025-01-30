import { getTitle } from "../_utils/get-title";

type HeroProps = {
  city?: string;
  country?: string;
  q?: string;
};

export default function Hero({ city, country, q }: HeroProps) {
  let heroTitle = getTitle({ city, country, q });

  return (
    <section className="relative h-64 overflow-hidden rounded-md bg-gradient-to-br from-primary via-primary/70 to-zinc-900 text-white">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-3 bg-gradient-to-br p-4">
        <h1 className="max-w-lg text-center font-inter text-3xl font-semibold sm:text-3xl md:text-4xl xl:max-w-xl xl:text-5xl">
          {heroTitle || "Best developer jobs at your fingertips in no time."}
        </h1>
      </div>
    </section>
  );
}
