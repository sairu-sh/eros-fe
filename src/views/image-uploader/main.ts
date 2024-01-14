import axios from "axios";
import "./../../style/style.css";

const http = axios.create({
  baseURL: "http://localhost:8000",
});

const form = document.getElementById("form-control");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Assuming you have an input field with the id "image-uploader"
  const input = document.getElementById("image-uploader") as HTMLInputElement;
  const files = input?.files;

  if (files) {
    const formData = new FormData();
    for (const file of files) {
      formData.append("photo", file);
    }

    try {
      const response = await http.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.status === 200) {
        window.location.href = "/views/registrationForm/";
      }
    } catch (error) {
      console.error(error);
    }
  }
});
