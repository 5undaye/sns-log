import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import { ImageIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post";

import { generateErrorMessage } from "@/lib/error";

import { useSession } from "@/store/session";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useOpenAlertModal } from "@/store/alert-modal";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const session = useSession();
  const postEditorModal = usePostEditorModal();

  const openAlertModal = useOpenAlertModal();

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, { position: "top-center" });
    },
  });

  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, { position: "top-center" });
    },
  });

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCloseModal = () => {
    if (content !== "" || images.length > 0) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다.",
        description: "이 화면에서 나가면 작성중인 내용이 사라집니다.",
        onPositive: () => {
          images.forEach((image) => {
            URL.revokeObjectURL(image.previewUrl);
          });
          postEditorModal.actions.close();
        },
      });

      return;
    }

    postEditorModal.actions.close();
  };

  const handleSavePostClick = () => {
    if (!postEditorModal.isOpen) return;
    if (content.trim() === "") return;

    if (postEditorModal.type === "CREATE") {
      createPost({
        content,
        images: images.map((image) => image.file),
        userId: session!.user.id,
      });
    }

    if (postEditorModal.type === "EDIT") {
      if (content === postEditorModal.content) return;

      updatePost({
        id: postEditorModal.postId,
        content: content,
      });
    }
  };

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    event.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    URL.revokeObjectURL(image.previewUrl);

    setImages((prevImages) =>
      prevImages.filter(
        (prevImage) => prevImage.previewUrl !== image.previewUrl,
      ),
    );
  };

  const updateContents = useEffectEvent(() => {
    if (!postEditorModal.isOpen) return;

    if (postEditorModal.type === "CREATE") {
      setContent("");
      setImages([]);
    }
    if (postEditorModal.type === "EDIT") setContent(postEditorModal.content);
  });

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    textAreaRef.current?.focus();
    updateContents();
  }, [postEditorModal.isOpen]);

  const isPending = isCreatePostPending || isUpdatePostPending;

  return (
    <Dialog open={postEditorModal.isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          disabled={isPending}
          ref={textAreaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
        />
        <input
          ref={fileInputRef}
          onChange={handleSelectImages}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />

        {postEditorModal.isOpen && postEditorModal.type === "EDIT" && (
          <Carousel>
            <CarouselContent>
              {postEditorModal.imageUrls?.map((url) => (
                <CarouselItem className="basis-2/5" key={url}>
                  <div className="relative">
                    <img
                      src={url}
                      className="h-full w-full rounded-sm object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {postEditorModal.isOpen && postEditorModal.type === "CREATE" && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        {postEditorModal.isOpen && postEditorModal.type === "CREATE" && (
          <Button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            disabled={isPending}
            variant={"outline"}
            className="cursor-pointer"
          >
            <ImageIcon />
            이미지 추가
          </Button>
        )}
        <Button
          disabled={isPending}
          onClick={handleSavePostClick}
          className="cursor-pointer"
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
