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
  if (response.status === 200) renderEditor(response.data);
} catch (e) {}

function renderEditor(data: IDetails) {
  const body = document.body || document.createElement("body");
  const media = createMediaDIv(data);
  const about = createAboutDIv(data);
  const interests = createInterestDIv(data);
  const basics = createBasicsDiv(data);

  body.append(media, about, interests, basics);
}

function createMediaDIv(data: IDetails) {
  const media = document.createElement("div");
  media.setAttribute("id", "media");
  media.innerHTML = "";
  media.innerHTML = `<h3>Media</h3>`;
  for (let i = 0; i < 6; i++) {
    const imageHolder = document.createElement("div");
    imageHolder.classList.add("image-holder");
    if (data.imageurls[i]) {
      const image = document.createElement("img");
      image.src = data.imageurls[i];
      imageHolder.appendChild(image);
      imageHolder.innerHTML += `<button class="btn remover" id="remover"><i class="ph ph-minus"></i></button>`;
    } else {
      imageHolder.classList.add("empty");
      imageHolder.innerHTML += `<button class="btn adder" id="adder"><i class="ph ph-plus"></i></button>`;
    }
    media?.appendChild(imageHolder);
  }
  return media;
}

function createAboutDIv(data: IDetails) {
  const about = document.createElement("div");
  about.setAttribute("id", "about");
  about.innerHTML = "";
  const title = document.createElement("h3");
  title.innerHTML = "About Me";
  const aboutInput = document.createElement("textarea");
  aboutInput.value = data.bio;
  about?.append(title, aboutInput);
  return about;
}

function createInterestDIv(data: IDetails) {
  const interests = document.createElement("div");
  interests.setAttribute("id", "interests");
  interests.innerHTML = "";
  const title = document.createElement("h3");
  title.innerHTML = "Interests";
  interests?.append(title);

  data.interests.forEach((interest) => {
    const p = document.createElement("p");
    p.innerHTML = interest.interest;
    p.classList.add("interest-p");
    p.setAttribute("data-id", `${data.id}`);
    interests?.appendChild(p);
  });
  return interests;
}

function createBasicsDiv(data: IDetails) {
  const basics = document.createElement("div");
  basics.setAttribute("id", "basics");
  basics.innerHTML = "";
  const title = document.createElement("h3");
  title.innerHTML = "Basics";
  const location = document.createElement("h4");
  location.innerHTML = "Where I live";
  const city = document.createElement("textarea");
  city.value = data.city;
  const education = document.createElement("h4");
  education.innerHTML = "My education";
  const college = document.createElement("textarea");
  college.value = data.college;
  basics?.append(title, location, city, education, college);

  return basics;
}
