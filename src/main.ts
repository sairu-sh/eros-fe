// import "./style.css";
// import axios from "axios";

// // const loginBtn = document.getElementById("login-btn");
// // const signupBtn = document.getElementById("signup-btn");
// const loginAnchor = document.getElementById("login-anchor");
// const registerAnchor = document.getElementById("register-anchor");
// const signupForm = document.getElementById("signup-form");
// const loginForm = document.getElementById("login-form");

// const http = axios.create({
//   baseURL: "http://localhost:8000/auth",
// });

// registerAnchor?.addEventListener("click", () => {
//   signupForm?.classList.remove("hidden");
//   loginForm?.classList.add("hidden");
// });

// loginAnchor?.addEventListener("click", () => {
//   signupForm?.classList.add("hidden");
//   loginForm?.classList.remove("hidden");
// });

// // loginForm?.addEventListener("submit", (e) => {
// //   e.preventDefault();
// //   const email = document.getElementById("email") as HTMLInputElement;
// //   const password = document.getElementById("password") as HTMLInputElement;
// // });

// signupForm?.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const email = (document.getElementById("email-signup") as HTMLInputElement)
//     .value;
//   const password = (
//     document.getElementById("password-signup") as HTMLInputElement
//   ).value;
//   const fullname = (document.getElementById("full-name") as HTMLInputElement)
//     .value;

//   const username = (
//     document.getElementById("username-signup") as HTMLInputElement
//   ).value;

//   try {
//     const response = await http({
//       url: "/signup",
//       data: {
//         email,
//         password,
//         fullname,
//         username,
//       },
//       method: "POST",
//     });
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// });

window.onload = () => {
  window.location.href = "/views/login/";
};
