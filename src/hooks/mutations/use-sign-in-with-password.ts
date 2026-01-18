import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import type { useMutationCallback } from "@/types";

export function useSignInWithPassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
