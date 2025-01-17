"use client";

import React from "react";
import MDEditor from "@uiw/react-md-editor";

type DescriptionEditorProps = {
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function DescriptionEditor({
  setValue,
  value,
}: DescriptionEditorProps) {
  return (
    <div
      className="h-96 w-full overflow-hidden rounded-md border"
      data-color-mode="light"
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
