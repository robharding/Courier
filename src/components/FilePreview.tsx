import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { getFileUrl } from "../../convex/files";
import Image from "next/image";

interface FilePreviewProps {
  file: Doc<"files">;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const FilePreview: FC<FilePreviewProps> = ({ file, isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{file.name}</DialogTitle>
          <DialogDescription className="py-4">
            <Image
              src={getFileUrl(file.storageId)}
              width={600}
              height={600}
              alt="preview image"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreview;
