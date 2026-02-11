import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";
import { generateErrorMessage } from "@/lib/error";

export default function CommentEditor({ postId }: { postId: number }) {
  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCreateComment({
      onSuccess: () => {
        setContent("");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, { position: "top-center" });
      },
    });

  const [content, setContent] = useState("");

  const handleSubmitClick = () => {
    if (content.trim() === "") return;

    createComment({
      postId,
      content,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        disabled={isCreateCommentPending}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end">
        <Button disabled={isCreateCommentPending} onClick={handleSubmitClick}>
          작성
        </Button>
      </div>
    </div>
  );
}
