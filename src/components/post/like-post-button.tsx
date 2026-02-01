import { HeartIcon } from "lucide-react";
import { toast } from "sonner";

import { useTogglePostLike } from "@/hooks/mutations/post/use-toggle-post-like";

import { generateErrorMessage } from "@/lib/error";
import { useSession } from "@/store/session";

export default function LikePostButton({
  id,
  likeCount,
  isLiked,
}: {
  id: number;
  likeCount: number;
  isLiked: boolean;
}) {
  const session = useSession();

  const { mutate: togglePostLike } = useTogglePostLike({
    onError: (error) => {
      const message = generateErrorMessage(error);

      toast.error(message, { position: "top-center" });
    },
  });

  const handleLikeClick = () => {
    togglePostLike({ postId: id, userId: session!.user.id });
  };

  return (
    <div
      onClick={handleLikeClick}
      className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-sm"
    >
      <HeartIcon
        className={`h-4 w-4 ${isLiked && "fill-foreground border-foreground"}`}
      />
      <span>{likeCount}</span>
    </div>
  );
}
