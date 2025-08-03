"use client";

// components
import { DropzoneOptions } from "react-dropzone";
import { ImageIcon } from "lucide-react";
import React, { SetStateAction } from "react";

//
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";

type CompanyLogoUploadProps = {
  files: File[] | null;
  setFiles: React.Dispatch<SetStateAction<File[] | null>>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CompanyLogoUpload({
  files,
  setFiles,
  onChange,
}: CompanyLogoUploadProps) {
  // const [files, setFiles] = useState<File[] | null>([]);

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: false,
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropzone}
    >
      <div className="space-y-2">
        <FileInput id="logo__upload" onChange={onChange}>
          <div className="bg-background flex h-44 w-full flex-col items-center justify-center space-y-2 rounded-md border p-3 text-center">
            <ImageIcon className="stroke-muted-foreground size-6 md:size-8 lg:size-10" />
            <h1 className="text-muted-foreground font-semibold capitalize md:text-lg">
              Drop company logo here
            </h1>
            <p className="text-muted-foreground/60 text-sm font-medium">
              Only .png, .jpg, .jpeg format supported and maximum size of 2MB
              allowed.
            </p>
          </div>
        </FileInput>
      </div>
      <FileUploaderContent className="flex flex-row items-center gap-2 p-0">
        {files?.map((file, i) => (
          <FileUploaderItem
            key={i}
            index={i}
            className="h-full w-full overflow-hidden rounded-md p-0"
            aria-roledescription={`file ${i + 1} containing ${file.name}`}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-full w-full p-0"
            />
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
}
