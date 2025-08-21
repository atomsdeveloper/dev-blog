// Hooks
import { useId } from "react";

type InputTextProps = {
  labelText: string;
} & React.ComponentProps<"input">;

export function InputText({ labelText, ...props }: InputTextProps) {
  const id = useId(); // Generate a unique ID for the input element in each render this component is used

  return (
    <div className="flex flex-col gap-2 m-1">
      {labelText != "" && (
        <label className="text-xs font-bold" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        id={id}
        className={`bg-white text-base/tight outline-none ring-1 ring-gray-300 p-2 rounded transition focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:placeholder:text-gray-400 disabled:bg-slate-100 placeholder:text-slate-500 ${props.className}`}
        {...props}
      />
    </div>
  );
}
