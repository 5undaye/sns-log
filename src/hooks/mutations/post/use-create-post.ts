import { createPost } from "@/api/post";
import { useMutation } from "@tanstack/react-query";

import type { useMutationCallback } from "@/types";

export function useCreatePost(callbacks: useMutationCallback) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
