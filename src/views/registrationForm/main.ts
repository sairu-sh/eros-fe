import "../../style/style.css";
import axios from "axios";

const registrationForm = document.getElementById(
  "registration-form"
) as HTMLFormElement;

const interestDiv = document.getElementById("interests") as HTMLDivElement;

const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get("userId");

const http = axios.create({
  baseURL: "http://localhost:8000/",
});

let interestIdArray: number[] = [];

interestIdArray = Array.from(new Set(interestIdArray));

//fetch the interests from the database and render it to the screen
window.onload = async () => {
  try {
    const interests = await http({
      url: "/interests",
      method: "GET",
    });
    if (interests && interests.data) {
      interests.data.forEach((interest: { id: Number; interest: string }) => {
        const p = document.createElement("p");
        p.innerHTML = interest.interest;
        p.classList.add("interest-p");
        p.setAttribute("data-id", `${interest.id}`);
        interestDiv.appendChild(p);
      });
    }
  } catch (e) {}
};

interestDiv.addEventListener("click", (e) => {
  const pElement = e.target as HTMLParagraphElement;

  if (pElement.tagName.toLowerCase() === "p") {
    pElement.classList.toggle("active");
    const dataId = Number(pElement.getAttribute("data-id"));

    if (pElement.classList.contains("active")) {
      interestIdArray.push(dataId);
    } else {
      const indexToRemove = interestIdArray.indexOf(dataId);

      if (indexToRemove !== -1) {
        interestIdArray.splice(indexToRemove, 1);
      }
    }
  }
});

registrationForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bio = (document.getElementById("bio") as HTMLInputElement).value;
  const dob = (document.getElementById("dob") as HTMLInputElement).value;
  const gender = Number(
    (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)
      ?.value
  );

  const prefered_gender = Number(
    (
      document.querySelector(
        'input[name="gender_preference"]:checked'
      ) as HTMLInputElement
    )?.value
  );

  const college = (document.getElementById("education") as HTMLInputElement)
    .value;

  const prefered_age = Number(
    (document.getElementById("prefered-age") as HTMLInputElement).value
  );

  const interests = interestIdArray;

  try {
    const response = await http({
      url: `/create-details/${uid}`,
      method: "POST",
      data: {
        bio,
        dob,
        gender,
        prefered_gender,
        college,
        prefered_age,
        uid,
        interests,
      },
    });
    console.log(response);
  } catch (e) {}
});
