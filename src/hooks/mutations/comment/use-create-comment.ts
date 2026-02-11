import { createComment } from "@/api/comment";
import type { useMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useCreateComment(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
