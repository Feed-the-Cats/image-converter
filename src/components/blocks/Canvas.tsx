import { cn } from "@/lib/utils";
import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useAtomValue } from "jotai";
import { origine } from "@/store/store";

type propsType = ComponentPropsWithoutRef<"canvas">;
export const Canvas = ({
  src,
  ...props
}: { src: string } & propsType): React.JSX.Element => {
  const originePage = useAtomValue(origine);
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [value, setValue] = React.useState(0);

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(+target.value);
  };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const img = new Image();
    img.src = src;
    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    if (!ctx) return;
    ctx.filter = `grayscale(${value}%)`;
    ctx.drawImage(img, 0, 0);
  }, [src, value]);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl">Filters</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 justify-items-center">
        <div className={cn("min-w-28 max-w-4xl")}>
          <canvas {...props} className={cn("w-full h-auto")} ref={ref}></canvas>
        </div>

        <div className={cn("min-w-28 max-w-[32rem] w-full h-5 bg-orange-600")}>
          <div className={cn("w-full h-full bg-red-600")}>
            <input
              className={cn("w-[90%]")}
              type="range"
              name="test"
              id="test"
              max="+100"
              min="0"
              step={"1"}
              value={value}
              onChange={onChange}
            />
            <span>{value}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Canvas;
