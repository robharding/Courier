"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import UploadButton from "@/components/UploadButton";
import { Loader2 } from "lucide-react";
import FileCard from "@/components/FileCard";

export default function Home() {
  const { organization } = useOrganization();
  const { user } = useUser();

  const orgId = organization?.id || user?.id || "";

  const files = useQuery(api.files.getFiles, {
    orgId,
  });

  return (
    <main className="container pt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your Files</h1>
        <UploadButton />
      </div>

      {files ? (
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4 mt-8">
          {files.map((file) => (
            <div key={file._id}>
              <FileCard file={file} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Loader2 className="mt-12 w-8 h-8 animate-spin" />
        </div>
      )}
    </main>
  );
}
