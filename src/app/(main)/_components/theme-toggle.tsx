"use client";

// packages
import * as React from "react";
import { LaptopMinimalIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

// components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Change your theme</CardTitle>
        <CardDescription>
          Select your theme according to your choice
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-full items-center justify-between gap-2">
        <Button
          className="w-full"
          size={"sm"}
          variant={theme === "light" ? "default" : "secondary"}
          onClick={() => setTheme("light")}
        >
          <SunIcon />
          Light
        </Button>
        <Button
          className="w-full"
          size={"sm"}
          variant={theme === "dark" ? "default" : "secondary"}
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
          Dark
        </Button>
        <Button
          className="w-full"
          size={"sm"}
          variant={theme === "system" ? "default" : "secondary"}
          onClick={() => setTheme("system")}
        >
          <LaptopMinimalIcon />
          System
        </Button>
      </CardContent>
    </Card>
  );
}
