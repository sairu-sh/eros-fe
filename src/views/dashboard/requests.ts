import axios from "axios";
import { IReqData } from "../../interfaces/request-data.interface";

const http = axios.create({
  baseURL: "http://localhost:8000/",
});

const requestContainer = document.getElementById("active-container");
export const renderRequests = async () => {
  if (requestContainer) {
    requestContainer.innerHTML = ``;
    try {
      const response = await http({
        url: "/request/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      });
      console.log(response);
      if (response.status === 200 && response.data) {
        response.data.forEach((data: IReqData) => {
          const namePlate = document.createElement("div");
          namePlate.classList.add("nameplate");
          namePlate.setAttribute("data-id", `${data.id}`);
          const name = document.createElement("p");
          name.innerHTML = data.fullname;
          const image = document.createElement("img");
          image.src = data.imageUrl;
          const acceptBtn = document.createElement("button");
          acceptBtn.classList.add("btn", "accept-btn");
          acceptBtn.innerHTML = ` <i class="ph ph-check"></i>`;
          const declineBtn = document.createElement("button");
          declineBtn.classList.add("btn", "decline-btn");
          declineBtn.innerHTML = ` <i class="ph ph-x"></i>`;
          namePlate.append(image, name, acceptBtn, declineBtn);
          requestContainer.appendChild(namePlate);

          namePlate.addEventListener("click", (e) => {
            handleRequest(e);
          });
        });
      }
    } catch (e) {}
  }
};

async function handleRequest(e: MouseEvent) {
  const button = e.target as HTMLButtonElement;
  if (button instanceof HTMLButtonElement) {
    const id = Number(button.closest(".nameplate")?.getAttribute("data-id"));
    const result = await http({
      url: "/request/",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      data: {
        id,
      },
      method: "DELETE",
    });
    if (result.status === 200) {
      button.closest(".nameplate")?.remove();
    }
  }
}
