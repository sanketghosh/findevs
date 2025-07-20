import { getTitle } from "../_utils/get-title";

type HeroProps = {
  city?: string;
  country?: string;
  q?: string;
};

export default function Hero({ city, country, q }: HeroProps) {
  let isHero = true;
  let heroTitle = getTitle({ city, country, q, isHero });

  return (
    /*  <section className="bg-primary text-primary-foreground relative h-64 overflow-hidden rounded-2xl border-dotted">
      <div className="flex h-full w-full flex-col items-center justify-center space-y-3 bg-gradient-to-br p-4">
        
      </div>
    </section> */
    <div className="space-y-2 py-6">
      <h1 className="text-xl font-extrabold tracking-tighter capitalize md:text-2xl">
        Connecting Developers to Their Next Big Opportunity.
      </h1>
      <p className="text-left text-base leading-tight font-medium tracking-tight">
        {!heroTitle
          ? "Best developer jobs at your fingertips in no time."
          : heroTitle}
      </p>
    </div>
  );
}
