import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-5">
      <LoaderCircle className="animate-spin" />
      <span className="text-sm">데이터를 불러오는 중입니다.</span>
    </div>
  );
}
