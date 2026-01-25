import { updatePost } from "@/api/post";
import { useMutation } from "@tanstack/react-query";

import type { useMutationCallback } from "@/types";

export function useUpdatePost(callbacks: useMutationCallback) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
