"use client";

import * as React from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  },
);

import dynamic from "next/dynamic";
export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  //   const [isLoaded, setIsLoaded] = React.useState(false);

  // React.useEffect(() => {
  //   setIsLoaded(true);
  // }, []);

  // if (!isLoaded) {
  //   return null;
  // }
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

/* "use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
 */
