import "./../../style/style.css";
import axios from "axios";
import { IMatch } from "../../interfaces/matches.interface";
import { IChat } from "../../interfaces/chat.interface";

const http = axios.create({
  baseURL: "http://localhost:8000",
});

const matchResponse = await http({
  url: "/match/",
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

if (matchResponse.status === 200) {
  renderMatches(matchResponse.data);
}

async function renderMatches(data: IMatch[]) {
  const matchContainer = document.getElementById("matches");
  if (matchContainer) {
    matchContainer.innerHTML = "";
    data.forEach((match, i) => {
      const container = document.createElement("div");
      container.classList.add("match");
      container.setAttribute("data-id", `${match.secondaryUser}`);
      const img = document.createElement("img");
      img.src = match.url;
      img.alt = String(i);
      const p = document.createElement("p");
      p.innerHTML = match.fullname;
      container.append(img, p);
      matchContainer.appendChild(container);
    });
  }
  matchContainer?.addEventListener("click", (e) => {
    loadChat(e);
  });
}

async function loadChat(e: MouseEvent) {
  const img = e.target as HTMLImageElement;
  const parent = img.closest(".match");
  const secondaryUser = Number(parent?.getAttribute("data-id"));
  const response = await http({
    url: `/chats/${secondaryUser}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  if (response.status === 200) {
    const chatBox = document.getElementById("chat-box");
    console.log(chatBox);
    if (chatBox) {
      chatBox.innerHTML = "";
    }
    response.data.forEach((chat: IChat) => {
      const p = document.createElement("p");
      p.innerHTML = chat.content;
      if (chat.senderId === secondaryUser) {
        p.classList.add("opposite");
      } else {
        p.classList.add("self");
      }
      chatBox?.appendChild(p);
    });
  }
}
