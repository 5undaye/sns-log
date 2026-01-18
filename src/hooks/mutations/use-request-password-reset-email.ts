import { requestPasswordResetEmail } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import type { useMutationCallback } from "@/types";

export function useRequestPasswordResetEmail(callbacks: useMutationCallback) {
  return useMutation({
    mutationFn: requestPasswordResetEmail,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
