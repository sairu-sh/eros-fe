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
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      window.location.href = "/";
    }
  } catch (error) {
    console.error(error);
  }
});
