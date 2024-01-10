import "../../style/style.css";
import axios from "axios";

const loginForm = document.getElementById("login-form");

const http = axios.create({
  baseURL: "http://localhost:8000/auth",
});

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  try {
    const response = await http({
      url: "/login",
      data: {
        email,
        password,
      },
      method: "POST",
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});
