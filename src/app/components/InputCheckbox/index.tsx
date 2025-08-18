// Hooks
import { useId } from "react";

type InputCheckboxProps = {
  labelText: string;
  type?: "checkbox";
} & React.ComponentProps<"input">;

export function InputCheckbox({
  labelText,
  type,
  ...props
}: InputCheckboxProps) {
  const id = useId(); // Generate a unique ID for the input element in each render this component is used

  return (
    <div className="flex items-center gap-3">
      <input
        type={type}
        {...props}
        name={id}
        className="h-4 w-4 outline-0 foucus:ring-1 focus:ring-blue-500 foucus:rounded transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:ring-gray-300 disabled:placeholder:text-gray-400 placeholder:text-slate-500"
      />
      {labelText != "" && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}
