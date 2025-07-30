// Action
import { deletePostAction } from "@/actions/post/delete-post-action";

// Icons
import { Trash2Icon } from "lucide-react";

// Hook Server
import { useTransition } from "react";

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

  const handleClick = () => {
    startTransaction(async () => {
      await deletePostAction(id);
    });
  };

  return (
    <button
      title={`Apagar post ${title}`}
      aria-label="Apagar post."
      className="text-red-500 cursor-pointer transition hover:scale-125 hover:text-red-600 [&_svg]:w-4 [&_svg]:h-4 disabled:cursor-not-allowed disabled:text-slate-500"
      onClick={handleClick}
      disabled={isPending}
    >
      <Trash2Icon />
    </button>
  );
}
