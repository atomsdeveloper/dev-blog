// Utils
import { formatDateWithHours, formatDistanceToNow } from "@/utils/format-date";

type PostDateProps = {
  createdAt: Date | string;
};

export function PostDate({ createdAt }: PostDateProps) {
  return (
    <time
      className="text-slate-600 text-sm/tight"
      dateTime="2025-07-20"
      title={formatDistanceToNow(new Date())}
    >
      {formatDateWithHours(createdAt)}
    </time>
  );
}
