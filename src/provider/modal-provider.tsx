import type { ReactNode } from "react";

import { createPortal } from "react-dom";
import PostEditorModal from "@/components/modal/post-editor-modal";
import AlertModal from "@/components/modal/alert-modal";
import ProfileEditorModal from "@/components/modal/profile-editor-modal";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />
          <AlertModal />
          <ProfileEditorModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
