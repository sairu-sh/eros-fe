import axios from "axios";
import { IDetails } from "../../interfaces/user-details.interface";
import { calculateAge } from "../../util/ageCalculator.util";

const http = axios.create({
  baseURL: "http://localhost:8000/",
});

const profilesContainer = document.getElementById("profiles") as HTMLDivElement;
const emptyProfile = document.getElementById("empty-profile") as HTMLDivElement;
const profileCard = document.getElementById("profile-card") as HTMLDivElement;

profilesContainer.addEventListener("click", async (e) => {
  const profile = e.target as HTMLDivElement;
  if (profile instanceof HTMLImageElement) {
    const profileDiv = profile.closest(".profile") as HTMLDivElement;
    const profileId: Number = Number(profileDiv.getAttribute("data-id"));

    const details = await getDetails(profileId);
    if (details) {
      renderDetails(details);
    }
  }
});

async function getDetails(id: Number) {
  try {
    const response = await http({
      url: `/get-details/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      method: "GET",
    });

    if (response.status === 200) return response.data;
  } catch (e) {}
}

function renderDetails(details: IDetails) {
  console.log(details);
  emptyProfile?.classList.add("hidden");
  profileCard.innerHTML = "";
  const name = document.createElement("div");
  name.classList.add("name");
  const age = calculateAge(new Date(details.dob));

  name.innerHTML = `
      <h3>${details.fullname}<span style="margin-left: 20px">${age}</span></h3>
      <button class="request">
        <img
          src="./../../assets/images/send-request.png"
          alt="send-request"
        />
      </button>`;

  imageLength = details.imageurls.length;
  const images = document.createElement("div");
  images.classList.add("images");
  images.setAttribute("id", "images");
  const img = document.createElement("img");
  img.classList.add("active");
  img.src = details.imageurls[0];
  img.setAttribute("data-id", "0");
  images.appendChild(img);

  details.imageurls.forEach((image, index) => {
    if (index > 0) {
      const img = document.createElement("img");
      img.src = image;
      img.setAttribute("data-id", `${index}`);
      images.appendChild(img);
    }
  });

  const btnRight = document.createElement("button");
  btnRight.classList.add("btn", "right");
  btnRight.innerHTML = `<i class="ph ph-arrow-fat-line-right"></i>`;

  const btnLeft = document.createElement("button");
  btnLeft.classList.add("btn", "left");
  btnLeft.innerHTML = `<i class="ph ph-arrow-fat-line-left"></i>`;

  images.appendChild(btnRight);
  images.appendChild(btnLeft);

  const leftBtn = images.querySelector(".ph-arrow-fat-line-left");
  const rightBtn = images.querySelector(".ph-arrow-fat-line-right");

  leftBtn?.addEventListener("click", () => {
    console.log("left");
    changeImages(-1);
  });

  rightBtn?.addEventListener("click", () => {
    console.log("right");
    changeImages(1);
  });

  const about = document.createElement("div");
  about.innerHTML = `
  <h3>About me</h3>
  <p>${details.bio}</p>`;

  const essentials = document.createElement("div");
  essentials.innerHTML = `
  <h3>Essentials</h3>
  <p>${Math.ceil(details.distance)} kilometers away</p>
  <p>Lives in ${details.city}</p>
  <p>${details.gender}</p>`;

  const basics = document.createElement("div");
  const zodiac = getZodiacSign(new Date(details.dob));
  basics.innerHTML = `
  <h3>Basics</h3>
  <h4>Zodiac</h4>
  <p>${zodiac}</p>
  <h4>Education</h4>
  <p>${details.college}</p>`;

  const interests = document.createElement("div");
  interests.innerHTML = `
  <h3>Interests</h3>`;

  const interestDiv = document.createElement("div");
  interestDiv.classList.add("interests");

  details.interests.forEach((interest) => {
    interestDiv.innerHTML += `
    <p>${interest}</p>
    `;
  });
  interests.appendChild(interestDiv);

  profileCard.append(name, images, about, essentials, basics, interests);

  changeImages(details.imageurls.length);
}

function getZodiacSign(dob: Date): string {
  const month = dob.getMonth() + 1; // Months are zero-based, so add 1

  if (
    (month === 3 && dob.getDate() >= 21) ||
    (month === 4 && dob.getDate() <= 19)
  ) {
    return "Aries";
  } else if (
    (month === 4 && dob.getDate() >= 20) ||
    (month === 5 && dob.getDate() <= 20)
  ) {
    return "Taurus";
  } else if (
    (month === 5 && dob.getDate() >= 21) ||
    (month === 6 && dob.getDate() <= 20)
  ) {
    return "Gemini";
  } else if (
    (month === 6 && dob.getDate() >= 21) ||
    (month === 7 && dob.getDate() <= 22)
  ) {
    return "Cancer";
  } else if (
    (month === 7 && dob.getDate() >= 23) ||
    (month === 8 && dob.getDate() <= 22)
  ) {
    return "Leo";
  } else if (
    (month === 8 && dob.getDate() >= 23) ||
    (month === 9 && dob.getDate() <= 22)
  ) {
    return "Virgo";
  } else if (
    (month === 9 && dob.getDate() >= 23) ||
    (month === 10 && dob.getDate() <= 22)
  ) {
    return "Libra";
  } else if (
    (month === 10 && dob.getDate() >= 23) ||
    (month === 11 && dob.getDate() <= 21)
  ) {
    return "Scorpio";
  } else if (
    (month === 11 && dob.getDate() >= 22) ||
    (month === 12 && dob.getDate() <= 21)
  ) {
    return "Sagittarius";
  } else if (
    (month === 12 && dob.getDate() >= 22) ||
    (month === 1 && dob.getDate() <= 19)
  ) {
    return "Capricorn";
  } else if (
    (month === 1 && dob.getDate() >= 20) ||
    (month === 2 && dob.getDate() <= 18)
  ) {
    return "Aquarius";
  } else {
    return "Pisces";
  }
}

let imageLength = 0;
let currentImage = 0;
function changeImages(direction: number) {
  if (direction === -1) {
    if (currentImage === 0) {
      return;
    } else {
      currentImage--;
      removeActive();
    }
  } else if (direction === 1) {
    if (currentImage === imageLength - 1) {
      return;
    } else {
      currentImage++;
      console.log(currentImage);
      removeActive();
    }
  }
}

function removeActive() {
  const images = document.getElementById("images") as HTMLDivElement;
  const imagesChildren = images?.children;
  const imagesArray = Array.from(imagesChildren);
  console.log(imagesChildren);

  imagesArray.forEach((image) => {
    if (image instanceof HTMLImageElement) {
      image.classList.remove("active");
      if (image.getAttribute("data-id") === `${currentImage}`) {
        image.classList.add("active");
      }
    }
  });
}
