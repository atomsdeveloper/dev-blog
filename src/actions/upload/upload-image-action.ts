"use server";

export async function uploadImageAction() {
  console.log("Call action successfull.");
  return {
    user: {
      email: "user@gmail.com",
      password: "123",
    },
  };
}
