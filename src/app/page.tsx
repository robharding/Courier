"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import UploadButton from "@/components/UploadButton";
import { Loader2 } from "lucide-react";
import FileCard from "@/components/FileCard";
import Image from "next/image";

const EmptyFiles = () => (
  <div className="flex items-center justify-center flex-col mt-24 gap-4">
    <Image
      src="/upload.svg"
      width={250}
      height={250}
      aria-label="hidden"
      alt="empty dashboard illustration"
    />
    <div className="items-center flex flex-col">
      <h3 className="text-xl font-medium text-gray-900">
        Its pretty quiet around here.
      </h3>
      <p className="text-gray-500">
        <UploadButton>
          <span className="text-gray-600 hover:text-gray-700 hover:underline cursor-pointer">
            Upload a file
          </span>
        </UploadButton>{" "}
        to get started.
      </p>
    </div>
  </div>
);

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
        files.length === 0 ? (
          <EmptyFiles />
        ) : (
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4 mt-8">
            {files.map((file) => (
              <div key={file._id}>
                <FileCard file={file} />
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="flex items-center justify-center">
          <Loader2 className="mt-12 w-8 h-8 animate-spin" />
        </div>
      )}
    </main>
  );
}
