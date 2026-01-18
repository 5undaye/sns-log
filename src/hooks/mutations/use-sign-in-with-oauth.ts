import { signInWithOAuth } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import type { useMutationCallback } from "@/types";

export function useSignInWithOAuth(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error: Error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
