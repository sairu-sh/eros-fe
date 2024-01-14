const navBar = document.getElementById("nav-bar") as HTMLDivElement;

const navList = navBar?.querySelectorAll("li");

function removeActive() {
  navList?.forEach((li) => {
    li.classList.remove("active");
  });
}

navBar?.addEventListener("click", (e) => {
  const navElement = e.target as HTMLElement;
  console.log(e.target);

  if (navElement instanceof HTMLImageElement) {
    removeActive();
    navElement.closest("li")?.classList.add("active");
  }
});
