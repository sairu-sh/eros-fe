const navBar = document.getElementById("nav-bar") as HTMLDivElement;

navBar.addEventListener("click", (e) => {
  const navElement = e.target as HTMLElement;
  if (navElement instanceof HTMLImageElement) {
    const parent = navElement.closest("li");
    if (parent?.getAttribute("id") === "chat") return;
    if (parent?.getAttribute("id") === "home")
      window.location.href = "/views/dashboard/";
    if (parent?.getAttribute("id") === "me")
      window.location.href = "/views/me/";
  }
});
