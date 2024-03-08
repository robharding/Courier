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
import FileCardMenu from "./FileCardMenu";

interface FileCardProps {
  file: Doc<"files">;
}

const FileCard: FC<FileCardProps> = ({ file }) => {
  return (
    <Card className="relative p-2">
      <FileCardMenu file={file} />
      <CardHeader>
        <CardTitle className="truncate py-2">{file.name}</CardTitle>
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
