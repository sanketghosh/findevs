/* type getTitleProps = {
  city?: string;
  country?: string;
  q?: string;
  isHero?: boolean;
};

export function getTitle({ city, country, q, isHero }: getTitleProps) {
  console.log("@@@FROM GET-TITLE: ", {
    city,
    country,
    q,
  });

  let headerQuery = q ? `${q} jobs` : "";

  let headerLocation =
    city && country
      ? `Developer jobs in ${city}, ${country}`
      : city
        ? `Developer jobs in ${city}`
        : country
          ? `Best developer jobs in ${country}`
          : "";

  let title =
    headerQuery.length > 0 && headerLocation.length > 0
      ? `${headerQuery} ${headerLocation}`
      : `${isHero ? "Find best developer jobs at your fingertips" : "findevs"}`;

  // return `${headerQuery} ${headerLocation}`;
  return title;
}
 */

type getTitleProps = {
  city?: string;
  country?: string;
  q?: string;
  isHero?: boolean;
};

export function getTitle({ city, country, q, isHero }: getTitleProps): string {
  /*  console.log("@@@FROM GET-TITLE: ", {
    city,
    country,
    q,
  }); */

  const headerQuery = q ? `${q} jobs` : "";

  const headerLocation =
    city && country
      ? `Developer jobs in ${city}, ${country}`
      : city
        ? `Developer jobs in ${city}`
        : country
          ? `Best developer jobs in ${country}`
          : "";

  let title = "";

  if (headerQuery && headerLocation) {
    title = `${headerQuery} ${headerLocation}`;
  } else if (headerQuery) {
    title = headerQuery;
  } else if (headerLocation) {
    title = headerLocation;
  } else {
    title = isHero
      ? "Best developer jobs at your fingertips in no time."
      : "findevs";
  }

  return title;
}
