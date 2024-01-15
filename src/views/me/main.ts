import axios from "axios";
import { IDetails } from "../../interfaces/user-details.interface";
import "./../../style/style.css";

const http = axios.create({
  baseURL: "http://localhost:8000/",
});

let uid;
try {
  const response = await http({
    url: "/users/",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (response.status === 200) {
    uid = response.data.data.id;
  }
} catch (e) {}

try {
  const response = await http({
    url: `/get-details/${uid}/`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  console.log(response.data);
  if (response.status === 200) renderEditor(response.data);
} catch (e) {}

function renderEditor(data: IDetails) {
  const container =
    document.getElementById("profileForm") || document.createElement("form");
  container.setAttribute("id", "profileForm");
  container.innerHTML = "";
  console.log(container);
  const media = createMediaDIv(data);
  const about = createAboutDIv(data);
  // const interests = createInterestDIv(data);
  const basics = createBasicsDiv(data);

  const submit = document.createElement("button");
  submit.classList.add("submit-btn");
  submit.type = "submit";
  submit.innerHTML = "Submit";

  container.append(media, about, basics, submit);
  container.addEventListener("submit", (e) => {
    handleFormSubmission(e);
  });
}

function createMediaDIv(data: IDetails) {
  const media = document.createElement("div");
  media.setAttribute("id", "media");
  media.classList.add("media");
  media.innerHTML = "";

  for (let i = 0; i <= data.imageurls.length; i++) {
    const imageHolder = document.createElement("div");
    imageHolder.classList.add("image-holder");

    if (data.imageurls[i]) {
      const image = document.createElement("img");
      image.classList.add("image");
      image.src = data.imageurls[i];
      imageHolder.appendChild(image);

      const removerButton = document.createElement("button");
      removerButton.classList.add("btn", "remover");
      removerButton.innerHTML = '<i class="ph ph-minus"></i>';
      removerButton.addEventListener("click", (e) => {
        handleImageRemoval(e);
      });
      imageHolder.appendChild(removerButton);
      media.appendChild(imageHolder);
    } else {
      const input = document.createElement("input");
      input.type = "file";
      input.name = "file";
      input.setAttribute("id", "image-uploader");
      input.setAttribute("accept", "image/*");
      input.setAttribute("multiple", "true");
      media.appendChild(input);
    }
  }

  return media;
}

function createAboutDIv(data: IDetails) {
  const about = document.createElement("div");
  about.setAttribute("id", "about");
  about.classList.add("about");
  about.innerHTML = "";

  const title = document.createElement("h3");
  title.innerHTML = "About Me";

  const aboutInput = document.createElement("textarea");
  aboutInput.value = data.bio;
  aboutInput.setAttribute("placeholder", "About Me");
  aboutInput.setAttribute("id", "bio");

  about.append(title, aboutInput);

  return about;
}

// function createInterestDIv(data: IDetails) {
//   const interests = document.createElement("div");
//   interests.setAttribute("id", "interests");
//   interests.classList.add("interests");
//   interests.innerHTML = "";
//   const title = document.createElement("h3");
//   title.innerHTML = "Interests";
//   interests?.append(title);

//   data.interests.forEach((interest) => {
//     const p = document.createElement("p");
//     p.innerHTML = interest.interest;
//     p.classList.add("interest-p");
//     p.setAttribute("data-id", `${data.id}`);
//     interests?.appendChild(p);
//   });
//   return interests;
// }

function createBasicsDiv(data: IDetails) {
  const basics = document.createElement("div");
  basics.setAttribute("id", "basics");
  basics.classList.add("basics");
  basics.innerHTML = "";

  const title = document.createElement("h3");
  title.innerHTML = "Basics";
  basics.appendChild(title);

  const location = document.createElement("h4");
  location.innerHTML = "Where I live";

  const city = document.createElement("textarea");
  city.value = data.city;
  city.setAttribute("placeholder", "City");
  city.setAttribute("id", "city");

  const education = document.createElement("h4");
  education.innerHTML = "My education";

  const college = document.createElement("textarea");
  college.value = data.college;
  college.setAttribute("placeholder", "College");
  college.setAttribute("id", "education");

  basics.append(location, city, education, college);

  return basics;
}

async function handleImageRemoval(e: MouseEvent) {
  e.preventDefault();
  const button = e.target as HTMLButtonElement;
  const parent = button.closest(".image-holder") as HTMLDivElement;
  parent.remove();
  parent.classList.add("empty");
  await http({
    url: "/upload-image/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    data: {
      url: (parent.querySelector(".image") as HTMLImageElement)?.src,
    },
    method: "DELETE",
  });
}

async function handleFormSubmission(e: SubmitEvent) {
  e.preventDefault();
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
        console.log("done");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const bio = (document.getElementById("bio") as HTMLInputElement).value;
  const city = (document.getElementById("city") as HTMLInputElement).value;
  const college = (document.getElementById("education") as HTMLInputElement)
    .value;
  try {
    const response = await http({
      url: "/create-details/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: {
        bio,
        city,
        college,
      },
      method: "PATCH",
    });
    if (response.status === 200) {
      window.location.href = "/views/dashboard/";
    }
  } catch {}
}
