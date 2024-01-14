import "./../../style/style.css";
import { IProfile } from "../../interfaces/profile.interface";
import { calculateAge } from "../../util/ageCalculator.util";
import axios from "axios";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      updateUserLocation(latitude, longitude);
    },
    (error) => {
      console.error(`Error getting location: ${error.message}`);
    }
  );
} else {
  console.log("Geolocation is not supported");
}

const accessToken = localStorage.getItem("accessToken");

const http = axios.create({
  baseURL: "http://localhost:8000",
});
async function updateUserLocation(latitude: number, longitude: number) {
  try {
    const response = await http({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: "/update-location",
      data: {
        latitude,
        longitude,
      },
      method: "POST",
    });
    if (response.status === 200) {
      console.log("location updated successfully");
    }
  } catch (e) {
    console.error("location update failed");
  }
}
getProfiles();

async function getProfiles() {
  try {
    const profileList = await http({
      url: "/get-profiles",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });

    if (profileList.status === 200) {
      const profiles: IProfile[] = profileList.data;
      renderProfiles(profiles);
    }
  } catch (e) {}
}

function renderProfiles(profiles: IProfile[]) {
  const profileContainer = document.getElementById("profiles");
  profiles.forEach((profile) => {
    const birthDate: Date = new Date(profile.dob);
    const age = calculateAge(birthDate);
    const profileElement = document.createElement("div");
    profileElement.classList.add("profile");
    profileElement.setAttribute("data-id", `${profile.uid}`);
    const image = document.createElement("img");
    image.src = `${profile.imageUrl}`;
    profileElement.appendChild(image);
    const profileTag = document.createElement("p");
    profileTag.innerHTML = `
        <span class="main-text"
        >${profile.fullname}<span style="margin-left: 20px">${age}</span></span
      >
      <br />
      <span class="small-text">${Math.ceil(profile.distance)} km away</span>
    `;
    profileElement.appendChild(profileTag);
    profileContainer?.appendChild(profileElement);
  });
}
