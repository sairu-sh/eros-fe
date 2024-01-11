import "./../../style/style.css";
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
