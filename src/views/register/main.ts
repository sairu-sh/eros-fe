import "../../style/style.css";
import axios from "axios";

const signupForm = document.getElementById("signup-form");

const http = axios.create({
  baseURL: "http://localhost:8000/auth",
});

signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = (document.getElementById("email-signup") as HTMLInputElement)
    .value;
  const password = (
    document.getElementById("password-signup") as HTMLInputElement
  ).value;
  const fullname = (document.getElementById("full-name") as HTMLInputElement)
    .value;

  const username = (
    document.getElementById("username-signup") as HTMLInputElement
  ).value;

  try {
    const response = await http({
      url: "/signup",
      data: {
        email,
        password,
        fullname,
        username,
      },
      method: "POST",
    });
    if (response && response.data && response.data.id) {
      const userId = response.data.id;

      window.location.href = `/views/registrationform/?userId=${userId}`;
    }
  } catch (error) {
    console.error(error);
  }
});
