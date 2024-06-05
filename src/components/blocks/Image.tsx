import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { imageSource } from "@/store/store.ts";
import { useAtomValue } from "jotai";
import { FC } from "react";

const Image: FC = (): React.JSX.Element => {
  const img = useAtomValue(imageSource);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl">Image source</CardTitle>
      </CardHeader>
      <CardContent className="grid justify-items-center gap-4">
        <div>
          <img src={img} alt="image source" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Image;
