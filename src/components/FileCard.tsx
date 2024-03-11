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
import { Download, FileTextIcon, ImageIcon, VideoIcon } from "lucide-react";
import { Button } from "./ui/button";

interface FileCardProps {
  file: Doc<"files">;
}

const FileIcon = {
  image: <ImageIcon className="h-6 w-6" />,
  document: <FileTextIcon className="h-6 w-6" />,
  video: <VideoIcon className="h-6 w-6" />,
} as const;

const FileCard: FC<FileCardProps> = ({ file }) => {
  return (
    <Card className="relative p-2">
      <FileCardMenu file={file} />
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2 truncate py-2 mt-2">
          <div className="flex-shrink-0 h-full flex">{FileIcon[file.type]}</div>
          {file.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <Button size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileCard;
