import axios from "axios";
import { IReqData } from "../../interfaces/request-data.interface";

const http = axios.create({
  baseURL: "http://localhost:8000/",
});

const requestContainer = document.getElementById("active-container");
export const renderRequests = async () => {
  if (requestContainer) {
    try {
      const response = await http({
        url: "/request/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      });
      requestContainer.innerHTML = ``;
      console.log(response);
      if (response.status === 200 && response.data) {
        const reqContainer = document.createElement("div");
        reqContainer.classList.add("request-container");
        if (response.data.length === 0) {
          const noRequest = document.createElement("p");
          noRequest.classList.add("no-request");
          noRequest.innerHTML = "You have no Requests";
          requestContainer.appendChild(noRequest);
          return;
        }
        response.data.forEach((data: IReqData) => {
          const namePlate = document.createElement("div");
          namePlate.classList.add("nameplate");
          namePlate.setAttribute("data-id", `${data.id}`);
          const name = document.createElement("p");
          name.innerHTML = data.fullname;
          const image = document.createElement("img");
          image.src = data.imageUrl;
          const buttons = document.createElement("div");
          buttons.classList.add("btn-container");
          const acceptBtn = document.createElement("button");
          acceptBtn.classList.add("btn", "accept-btn");
          acceptBtn.innerHTML = ` <i class="ph ph-check"></i>`;
          const declineBtn = document.createElement("button");
          declineBtn.classList.add("btn", "decline-btn");
          declineBtn.innerHTML = ` <i class="ph ph-x"></i>`;
          buttons.append(acceptBtn, declineBtn);
          namePlate.append(image, name, buttons);
          reqContainer.appendChild(namePlate);

          namePlate.addEventListener("click", (e) => {
            handleRequest(e);
          });
        });
        requestContainer.appendChild(reqContainer);
      }
    } catch (e) {}
  }
};

async function handleRequest(e: MouseEvent) {
  const button = (e.target as HTMLElement).closest(".btn") as HTMLButtonElement;
  const id = Number(button.closest(".nameplate")?.getAttribute("data-id"));

  if (button instanceof HTMLButtonElement) {
    if (button.classList.contains("accept-btn")) {
      const result = await http({
        url: "/match/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          id,
        },
        method: "POST",
      });

      if (result.status === 200) {
        const namePlate = button.closest(".nameplate") as HTMLDivElement;
        if (namePlate) {
          namePlate.innerHTML = `You just matched!`;
        }
        setTimeout(() => {
          namePlate?.remove();
        }, 2000);
      }
    }
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
