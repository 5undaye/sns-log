import { togglePostLike } from "@/api/post";
import type { useMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useTogglePostLike(callbacks: useMutationCallback) {
  return useMutation({
    mutationFn: togglePostLike,
    onSuccess: () => {
      if (callbacks.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks.onError) callbacks.onError(error);
    },
  });
}
