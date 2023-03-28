import deleteImgSVG from "../images/delete-forever.svg";

function cleaner(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

function renderSidebar() {
  const sidebar = document.querySelector(".sidebar");

  const sideTitle = document.createElement("h2");
  sideTitle.textContent = "Targets";

  const projectHolder = document.createElement("div");
  projectHolder.classList.add("projects");

  sidebar.appendChild(sideTitle);
  sidebar.appendChild(projectHolder);
}

export function renderMainContent(project, index) {
  const mainContent = document.querySelector(".main");

  cleaner(mainContent);

  const contentName = document.createElement("h1");
  contentName.textContent = project.getName();

  const todos = document.createElement("div");
  todos.classList.add("todos");
  todos.setAttribute("data-project", index);

  mainContent.appendChild(contentName);
  mainContent.appendChild(todos);
}

export function renderProjects(projects) {
  const projectsRef = projects;
  const projectHolder = document.querySelector(".projects");

  cleaner(projectHolder);

  projectsRef.forEach((element, index) => {
    const newProject = document.createElement("div");
    newProject.classList.add("project");
    newProject.setAttribute("data-index", index);

    const projectName = document.createElement("p");
    projectName.textContent = element.getName();

    projectName.addEventListener("click", () => {
      renderMainContent(projectsRef[index], index);
    });

    newProject.appendChild(projectName);
    if (index > 0) {
      const deleteImg = document.createElement("img");
      deleteImg.setAttribute("src", deleteImgSVG);

      deleteImg.addEventListener("click", () => {
        const currentProject = document.querySelector(".todos").dataset.project;
        if (Number(currentProject) === index)
          renderMainContent(projectsRef[0], 0);
        projectsRef.splice(index, 1);
        renderProjects(projectsRef);
      });

      newProject.appendChild(deleteImg);
    }
    projectHolder.appendChild(newProject);
  });
}

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

  renderSidebar();
}
