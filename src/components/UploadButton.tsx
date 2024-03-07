"use client";

import { FC, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

import Dropzone from "react-dropzone";
import { Cloud, Loader2, File as FileIcon } from "lucide-react";
import { Progress } from "./ui/progress";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Doc } from "../../convex/_generated/dataModel";

interface UploadDropzoneProps {
  setIsOpen: (open: boolean) => void;
}

const UploadDropzone: FC<UploadDropzoneProps> = ({ setIsOpen }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const sendFile = useMutation(api.files.createFile);

  const { organization } = useOrganization();
  const { user } = useUser();

  if (!user) return <>Loading...</>;

  const orgId = organization?.id || user?.id || "";

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }

        return prev + 5;
      });
    }, 500);

    return interval;
  };

  return (
    <div>
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFile) => {
          setIsError(false);
          setIsUploading(true);
          const progressInterval = startSimulatedProgress();

          clearInterval(progressInterval);
          setUploadProgress(100);

          // Step 3: Save the newly allocated storage id to the database
          console.log(acceptedFile[0].type);

          const types = {
            "image/png": "image",
            "image/jpeg": "image",
            "image/gif": "image",
            "image/svg+xml": "image",
            "image/webp": "image",
            "application/pdf": "document",
            "application/msword": "document",
            "video/mp4": "video",
            "video/quicktime": "video",
            "video/x-msvideo": "video",
            "video/x-ms-wmv": "video",
          } as Record<string, Doc<"files">["type"]>;

          if (!types[acceptedFile[0].type]) {
            clearInterval(progressInterval);
            setUploadProgress(100);
            setIsError(true);
            return toast.error("File type not supported", {
              description: "Your file type is not supported.",
            });
          }

          // Step 1: Get a short-lived upload URL
          const postUrl = await generateUploadUrl();

          // Step 2: POST the file to the URL
          console.log(acceptedFile);
          const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": acceptedFile[0]!.type },
            body: acceptedFile[0],
          }).then((res) => res.json());

          const { storageId } = result;

          if (!storageId) {
            clearInterval(progressInterval);
            setUploadProgress(100);
            setIsError(true);
            return toast.error("Something went wrong", {
              description: "Your file failed to upload.",
            });
          }

          await sendFile({
            orgId,
            type: types[acceptedFile[0].type],
            userId: user.id,
            name: acceptedFile[0].name,
            storageId,
          });

          setIsOpen(false);
        }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div
            {...getRootProps()}
            className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
          >
            <div
              className="flex items-center justify-center h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                  <p className="mb-2 text-sm text-zinc-700">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop.
                  </p>
                  <p className="text-xs text-zinc-500">(up to 16MB)</p>
                </div>

                {acceptedFiles && acceptedFiles[0] ? (
                  <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                    <div className="px-3 py-2 h-full grid place-items-center">
                      <FileIcon className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="px-3 py-2 h-full text-sm truncate">
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}

                {isUploading ? (
                  <div className="w-full mt-4 max-w-xs mx-auto">
                    <Progress
                      value={uploadProgress}
                      className="h-1 w-full bg-zinc-200"
                      indicatorColor={
                        isError
                          ? "bg-red-500"
                          : uploadProgress === 100
                          ? "bg-green-500"
                          : undefined
                      }
                    />
                    {uploadProgress === 100 ? (
                      <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                        {isError ? (
                          "Something went wrong."
                        ) : (
                          <>
                            <Loader2 className="animate-spin h-3 w-3" />
                            <>Redirecting...</>
                          </>
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <input
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                  {...getInputProps()}
                />
              </label>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

interface UploadButtonProps {
  children?: React.ReactNode;
}

const UploadButton: FC<UploadButtonProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {children ? children : <Button>Upload File</Button>}
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
