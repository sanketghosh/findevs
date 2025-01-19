"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "next-themes";

type DescriptionEditorProps = {
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function DescriptionEditor({
  setValue,
  value,
}: DescriptionEditorProps) {
  const { theme } = useTheme();

  return (
    <div
      className="h-96 w-full overflow-hidden rounded-md border"
      data-color-mode={theme === "dark" ? "dark" : "light"}
    >
      <MDEditor
        value={value && value}
        preview="edit"
        onChange={(val) => setValue(val)}
        height={384}
      />
    </div>
  );
}
