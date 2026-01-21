import { signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import type { useMutationCallback } from "@/types";

export function useSignUp(callbacks: useMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error: Error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
