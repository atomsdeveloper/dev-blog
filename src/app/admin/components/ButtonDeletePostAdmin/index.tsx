"use client";

// Action
import { deletePostAction } from "@/actions/post/delete-post-action";

// Icons
import { Trash2Icon } from "lucide-react";

// Hook Server
import { useState, useTransition } from "react";
import { Dialog } from "../Dialog";
import { toast } from "react-toastify";

type ButtonDeletePostAdminProps = {
  id: string;
  title: string;
};

export function ButtonDeletePostAdmin({
  title,
  id,
}: ButtonDeletePostAdminProps) {
  // Hook to status check of request function.
  const [isPending, startTransaction] = useTransition();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    toast.dismiss();
    toast.info("Excluindo post...");

    // The action will be executed in the server context.
    // The UI will be updated after the action is completed.
    startTransaction(async () => {
      const result = await deletePostAction(id);

      if (result.error) {
        toast.error("Erro ao excluir post.");
        return;
      }

      toast.success("Post excluído com sucesso!");

      setOpenDialog(false);
    });
  };

  return (
    <>
      <button
        title={`Apagar post ${title}`}
        aria-label="Apagar post."
        className="text-red-500 cursor-pointer transition hover:scale-125 hover:text-red-600 [&_svg]:w-4 [&_svg]:h-4 disabled:cursor-not-allowed disabled:text-slate-500"
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>

      {openDialog && (
        <Dialog
          wasOpened={openDialog}
          title="Confirmar exclusão"
          content={`Você tem certeza que deseja excluir o post "${title}"? Esta ação não pode ser desfeita.`}
          onCancel={() => setOpenDialog(false)}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
