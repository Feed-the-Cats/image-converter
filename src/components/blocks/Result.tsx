import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useClearImage } from "@/lib/hooks/useClearImage";
import toastConfig from "@/lib/toastonfig";
import { image64 } from "@/store/store.ts";
import { useAtomValue } from "jotai";
import { ClipboardCopy } from "lucide-react";
import { FC } from "react";
import { toast } from "react-toastify";

const Result: FC = (): React.JSX.Element => {
  const imgB64 = useAtomValue(image64);
  const setClearImage = useClearImage();

  const handleClick = () => {
    navigator.clipboard.writeText(imgB64 as string);
    toast.success("Image copied to clipboard", toastConfig);
    setClearImage();
  };

  return (
    <Card
      ref={(el) =>
        el && el.scrollIntoView({ block: "end", behavior: "smooth" })
      }
      className="w-full max-w-4xl"
    >
      <CardHeader>
        <CardTitle className="text-2xl">Image result</CardTitle>
      </CardHeader>
      <CardContent className="justify-items-center grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1">
        <div>
          <img src={imgB64} alt="image converted to base64" />
        </div>
        <div className="relative w-full h-full">
          <Textarea
            className="resize-none w-full h-full overflow-hidden"
            defaultValue={imgB64}
          />
          <Button
            onClick={handleClick}
            variant="outline"
            className="absolute top-0 right-0 flex h-10 w-10 p-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
          >
            <ClipboardCopy className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Result;
