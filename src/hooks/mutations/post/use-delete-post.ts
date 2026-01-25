import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "@/api/post";
import { deleteImagesInPath } from "@/api/image";

import type { useMutationCallback } from "@/types";
import { QUERY_KEYS } from "@/lib/constants";

export function useDeletePost(callbacks: useMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      queryClient.resetQueries({ queryKey: QUERY_KEYS.post.list });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
