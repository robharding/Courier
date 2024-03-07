import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Menu, Pencil, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Doc, Id } from "../../convex/_generated/dataModel";

interface FileCardMenuProps {
  file: Doc<"files">;
}

interface DeleteFileAlertDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  fileId: Id<"files">;
}

const DeleteFileAlertDialog: FC<DeleteFileAlertDialogProps> = ({
  isOpen,
  fileId,
  setIsOpen,
}) => {
  const deleteFile = useMutation(api.files.deleteFile);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this file
            and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteFile({ fileId })}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const FileCardMenu: FC<FileCardMenuProps> = ({ file }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger className="absolute top-1 right-1" asChild>
        <Button variant="ghost" size="sm">
          <Menu className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Pencil className="h-4 w-4 ml-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setIsOpen(true)}>
          <Trash className="h-4 w-4 ml-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>

      <DeleteFileAlertDialog
        isOpen={isOpen}
        setIsOpen={(isOpen) => setIsOpen(isOpen)}
        fileId={file._id}
      />
    </DropdownMenu>
  );
};

export default FileCardMenu;
