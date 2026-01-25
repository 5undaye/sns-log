import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

type CreateMode = {
  isOpen: true;
  type: "CREATE";
};

type EditMode = {
  isOpen: true;
  type: "EDIT";
  postId: number;
  content: string;
  imageUrls: string[] | null;
};

type OpenState = CreateMode | EditMode;

type CloseState = {
  isOpen: false;
};

type State = OpenState | CloseState;

const initialState = {
  isOpen: false,
} as State;

const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        openCreate: () =>
          set({ isOpen: true, type: "CREATE" }, undefined, "openCreate"),
        openEdit: (param: Omit<EditMode, "isOpen" | "type">) =>
          set({ isOpen: true, type: "EDIT", ...param }, undefined, "openEdit"),
        close: () => set({ isOpen: false }, undefined, "close"),
      },
    })),
    { name: "postEditorModalStore" },
  ),
);

export const useOpenCreatePostModal = () => {
  const openCreate = usePostEditorModalStore(
    (store) => store.actions.openCreate,
  );
  return openCreate;
};

export const useOpenEditPostModal = () => {
  const openEdit = usePostEditorModalStore((store) => store.actions.openEdit);
  return openEdit;
};

export const usePostEditorModal = () => {
  const store = usePostEditorModalStore();
  return store as typeof store & State;
};
