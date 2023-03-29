import renderMainContent from "./todos";
import renderSidebar from "./sidebar";

export default function renderPage(projects) {
  const bodySelector = document.querySelector("body");

  const content = document.createElement("div");
  content.classList.add("content");
  bodySelector.appendChild(content);

  const header = document.createElement("div");
  header.classList.add("header");

  const heroTitle = document.createElement("h1");
  heroTitle.textContent = "MetaHunt";
  header.appendChild(heroTitle);

  content.appendChild(header);

  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  content.appendChild(sidebar);
  renderSidebar(projects);

  const main = document.createElement("div");
  main.classList.add("main");
  content.appendChild(main);
  renderMainContent(projects[0], 0);
}
