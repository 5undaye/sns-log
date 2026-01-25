import { Button } from "@/components/ui/button";

import { useOpenEditPostModal } from "@/store/post-editor-modal";
import type { PostEntity } from "@/types";

export default function EditPostItemButton(post: PostEntity) {
  const openEditPostModal = useOpenEditPostModal();

  const handleButtonClick = () => {
    openEditPostModal({
      postId: post.id,
      content: post.content,
      imageUrls: post.image_urls,
    });
  };

  return (
    <Button
      onClick={handleButtonClick}
      className="cursor-pointer"
      variant={"ghost"}
    >
      수정
    </Button>
  );
}
