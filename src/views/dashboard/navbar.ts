import { renderRequests } from "./requests";

const navBar = document.getElementById("nav-bar") as HTMLDivElement;

const navList = navBar?.querySelectorAll("li");

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
  }
});
