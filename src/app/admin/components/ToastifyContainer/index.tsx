import { Bounce, ToastContainer } from "react-toastify";

export function ToastifyContainer() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={true}
      pauseOnHover={true}
      theme="light"
      transition={Bounce}
    />
  );
}
