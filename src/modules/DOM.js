import deleteImgSVG from "../images/delete-forever.svg";

export default function renderPage() {
  const bodySelector = document.querySelector("body");

  const content = document.createElement("div");
  content.classList.add("content");
  bodySelector.appendChild(content);

  const header = document.createElement("div");
  header.classList.add("header");
  content.appendChild(header);

  const sidebar = document.createElement("div");
  sidebar.classList.add("sidebar");
  content.appendChild(sidebar);

  const main = document.createElement("div");
  main.classList.add("main");
  content.appendChild(main);
}

export function renderSidebar() {
  const sidebar = document.querySelector(".sidebar");

  const sideTitle = document.createElement("h2");
  sideTitle.textContent = "Targets";

  const projectHolder = document.createElement("div");
  projectHolder.classList.add("projects");

  sidebar.appendChild(sideTitle);
  sidebar.appendChild(projectHolder);
}

export function renderProjects(projects) {
  const projectsRef = projects;
  const projectHolder = document.querySelector(".projects");

  while (projectHolder.firstChild) {
    projectHolder.removeChild(projectHolder.firstChild);
  }

  projectsRef.forEach((element, index) => {
    const newProject = document.createElement("button");
    newProject.classList.add("project");
    newProject.setAttribute("data-index", index);

    const projectName = document.createElement("p");
    projectName.textContent = element.getName();

    const deleteImg = document.createElement("img");
    deleteImg.setAttribute("src", deleteImgSVG);

    deleteImg.addEventListener("click", () => {
      delete projectsRef[index];
      renderProjects(projectsRef);
    });

    newProject.appendChild(projectName);
    newProject.appendChild(deleteImg);
    projectHolder.appendChild(newProject);
  });
}
