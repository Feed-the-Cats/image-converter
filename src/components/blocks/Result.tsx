import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useClearImage } from "@/lib/hooks/useClearImage";
import toastConfig from "@/lib/toastonfig";
import { image64 } from "@/store/store.ts";
import { useAtomValue } from "jotai";
import { ClipboardCopy } from "lucide-react";
import { FC, JSX } from "react";
import { toast } from "react-toastify";

const Result: FC = (): JSX.Element => {
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
      <CardContent className="grid grid-cols-1 grid-rows-2 justify-items-center gap-4 sm:grid-cols-2 sm:grid-rows-1">
        <div>
          <img src={imgB64} alt="image converted to base64" />
        </div>
        <div className="relative h-full w-full">
          <Textarea
            className="h-full w-full resize-none overflow-hidden"
            defaultValue={imgB64}
          />
          <Button
            onClick={handleClick}
            variant="outline"
            className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg p-0 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ClipboardCopy className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Result;
