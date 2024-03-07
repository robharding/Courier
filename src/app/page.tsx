"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import UploadButton from "@/components/UploadButton";
import { Loader2 } from "lucide-react";

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
        files.map((file) => (
          <div key={file._id}>
            {file.name}- {file.orgId}
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <Loader2 className="mt-12 w-8 h-8 animate-spin" />
        </div>
      )}
      {organization?.name}
    </main>
  );
}
