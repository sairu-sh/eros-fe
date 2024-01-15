import { renderRequests } from "./requests";

const navBar = document.getElementById("nav-bar") as HTMLDivElement;

const navList = navBar?.querySelectorAll("li");

const activeContainer = document.getElementById(
  "active-container"
) as HTMLDivElement;

let activeNav = "home";

function removeActive() {
  navList?.forEach((li) => {
    li.classList.remove("active");
  });
}

navBar?.addEventListener("click", (e) => {
  const navElement = e.target as HTMLElement;

  if (navElement instanceof HTMLImageElement) {
    const parentLi = navElement.closest("li");
    if (activeNav === parentLi?.getAttribute("id")) return;
    removeActive();
    parentLi?.classList.add("active");
    activeNav = parentLi?.getAttribute("id") as string;
    if (activeNav === "requests") renderRequests();
    if (activeNav === "home")
      activeContainer.innerHTML = `<div class="empty-profile" id="empty-profile">
    <img src="./../../assets/images/cupid.png" alt="cupid" />
    <p>
      Love connections start with a click! <br />Explore profiles and let
      Cupid guide you.
    </p>
  </div>`;

    if (activeNav === "me") window.location.href = "/views/me/";
    if (activeNav === "chat") window.location.href = "/views/chat/";
  }
});

export const gotoHome = () => {
  activeNav = "home";
  removeActive();
  navList[0].classList.add("active");
};
