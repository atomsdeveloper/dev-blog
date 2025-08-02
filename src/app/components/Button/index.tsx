type ButtonVariantProps = "default" | "ghost" | "danger";
type ButtonSizeProps = "sm" | "md" | "lg";

type ButtonProps = {
  variant: ButtonVariantProps;
  size: ButtonSizeProps;
  disabled?: boolean;
  children: React.ReactNode;
} & React.ComponentProps<"button">;

export function Button({
  variant,
  size,
  disabled = false,
  children,
  ...props
}: ButtonProps) {
  // Variants
  const classVariant: Record<ButtonVariantProps, string> = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "bg-transparent text-state-300 hover:bg-state-400",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  // Sizes
  const classSize: Record<ButtonSizeProps, string> = {
    sm: "px-2 py-1 text-xs/tight rounded-sm [&_svg]:w-3 [&_svg]:h-3 gap-1",
    md: "px-4 py-2 text-base/tight rounded-md [&_svg]:w-4 [&_svg]:h-4 gap-2",
    lg: "px-6 py-3 text-lg/tight rounded-lg [&_svg]:w-5 [&_svg]:h-5 gap-3",
  };

  return (
    <button
      {...props}
      className={`${
        disabled &&
        `disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-slate-400`
      }
        ${classSize[size]} ${classVariant[variant]}
        flex items-center justify-center cursor-pointer transition`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
