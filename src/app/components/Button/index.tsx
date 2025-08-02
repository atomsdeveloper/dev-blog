type ButtonProps = {
  children: React.ReactNode;
} & React.ComponentProps<"button">;

export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
