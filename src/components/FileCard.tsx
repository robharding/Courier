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
import { FileTextIcon, ImageIcon, VideoIcon } from "lucide-react";

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
        <CardTitle className="flex flex-row items-center gap-2 truncate py-2">
          <div className="flex-shrink-0 h-full flex">{FileIcon[file.type]}</div>
          {file.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p></p>
      </CardContent>
      <CardFooter>
        <p>card footer</p>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
