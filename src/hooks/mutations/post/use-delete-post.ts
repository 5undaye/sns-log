import { useMutation } from "@tanstack/react-query";

import { deletePost } from "@/api/post";
import { deleteImagesInPath } from "@/api/image";

import type { useMutationCallback } from "@/types";

export function useDeletePost(callbacks: useMutationCallback) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
