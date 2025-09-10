import { hashPassword } from "../lib/login/manage-login";

(async () => {
  const pass = await hashPassword("senha_aqui");
  console.log(pass);
})();
