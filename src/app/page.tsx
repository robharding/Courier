"use client";

import { Button } from "@/components/ui/button";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import UploadButton from "@/components/UploadButton";

export default function Home() {
  const { organization } = useOrganization();
  const { user } = useUser();

  const orgId = organization?.id || user?.id || "";

  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles, {
    orgId,
  });

  return (
    <main className="container pt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your Files</h1>
        {/* <Button
          onClick={() => {
            if (!orgId) return;

            createFile({ name: "Hello, world.", orgId }).catch((error) => {
              const errorMessage =
                error instanceof ConvexError
                  ? error.data
                  : "Unexpected error occurred";
              toast.error(errorMessage);
            });
          }}
        >
          Upload File
        </Button> */}
        <UploadButton />
      </div>

      {files?.map((file) => (
        <div key={file._id}>
          {file.name}- {file.orgId}
        </div>
      ))}
      {organization?.name}
    </main>
  );
}
