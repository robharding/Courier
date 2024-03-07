import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface FileCardProps {
  file: Doc<"files">;
}

const FileCard: FC<FileCardProps> = ({ file }) => {
  const deleteFile = useMutation(api.files.deleteFile);

  return (
    <Card className="relative p-2">
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-1 right-1"
        onClick={() => deleteFile({ fileId: file._id })}
      >
        <Trash className="w-4 h-4" />
      </Button>
      <CardHeader>
        <CardTitle className="">
          <h3 className="truncate">{file.name}</h3>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <p>card footer</p>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
