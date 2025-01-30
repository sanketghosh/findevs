type getTitleProps = {
  city?: string;
  country?: string;
  q?: string;
};

export function getTitle({ city, country, q }: getTitleProps) {
  let headerQuery = q ? `${q} jobs` : "";

  let headerLocation =
    city && country
      ? `Developer jobs in ${city}, ${country}`
      : city
        ? `Developer jobs in ${city}`
        : country
          ? `Best developer jobs in ${country}`
          : "";

  return `${headerQuery} ${headerLocation}`;
}
