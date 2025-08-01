import { ToastifyContainer } from "../components/ToastifyContainer";

export const dynamic = "force-dynamic";

export default async function Login() {
  return (
    <div className="py-16 text-6xl">
      <ToastifyContainer /> {/* Para possível popup de toast */}
    </div>
  );
}
