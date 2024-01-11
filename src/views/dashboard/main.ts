import "./../../style/style.css";

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    },
    (error) => {
      console.error(`Error getting location: ${error.message}`);
    }
  );
} else {
  console.log("Geolocation is not supported");
}
