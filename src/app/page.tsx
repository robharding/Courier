"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

export default function Home() {
  const createFile = useMutation(api.files.createFile);
  const files = useQuery(api.files.getFiles);

  return (
    <main>
      <Button
        onClick={() =>
          createFile({ name: "Hello, world." }).catch((error) => {
            const errorMessage =
              error instanceof ConvexError
                ? error.data
                : "Unexpected error occurred";
            toast.error(errorMessage);
          })
        }
      >
        Upload file
      </Button>

      {files?.map((file) => (
        <div key={file._id}>{file.name}</div>
      ))}
    </main>
  );
}
