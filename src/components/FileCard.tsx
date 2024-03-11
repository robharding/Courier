"use client";

import { FC, ReactNode, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Doc } from "../../convex/_generated/dataModel";
import FileCardMenu from "./FileCardMenu";
import {
  Download,
  FileTextIcon,
  Fullscreen,
  ImageIcon,
  VideoIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import FilePreview from "./FilePreview";

interface FileCardProps {
  file: Doc<"files">;
}

const FileIcon = {
  image: <ImageIcon className="h-6 w-6" />,
  document: <FileTextIcon className="h-6 w-6" />,
  video: <VideoIcon className="h-6 w-6" />,
} as Record<Doc<"files">["type"], ReactNode>;

const FileCard: FC<FileCardProps> = ({ file }) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="relative p-2">
        <FileCardMenu file={file} />
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-2 truncate py-2 mt-2">
            <div className="flex-shrink-0 h-full flex">
              {FileIcon[file.type]}
            </div>
            {file.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-2 items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setPreviewOpen(true)}
                  disabled={file.type !== "image"}
                  aria-hidden="true"
                >
                  <Fullscreen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>File preview</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </CardContent>
      </Card>
      <FilePreview
        file={file}
        isOpen={previewOpen}
        setIsOpen={setPreviewOpen}
      />
    </>
  );
};

export default FileCard;
