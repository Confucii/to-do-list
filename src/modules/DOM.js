import deleteImgSVG from "../images/delete-forever.svg";
import plusSVG from "../images/plus.svg";
import closeSVG from "../images/close.svg";

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

function renderProjectForm() {
  const bodySelector = document.querySelector("body");

  const modalDiv = document.createElement("div");
  modalDiv.classList.add("project-modal");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("project-modal-header");

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = "Add project";

  modalHeader.appendChild(modalTitle);

  const modalClose = document.createElement("button");
  modalClose.classList.add("project-modal-close");
  const modalCloseImg = document.createElement("img");
  modalCloseImg.setAttribute("src", closeSVG);
  modalClose.appendChild(modalCloseImg);

  modalClose.addEventListener("click", () => {
    modalDiv.remove();
  });

  modalHeader.appendChild(modalClose);

  modalDiv.appendChild(modalHeader);

  const projectForm = document.createElement("form");
  modalDiv.appendChild(projectForm);

  bodySelector.appendChild(modalDiv);
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

  const addProject = document.createElement("button");
  addProject.classList.add("add-project-btn");
  const addButtonImage = document.createElement("img");
  addButtonImage.setAttribute("src", plusSVG);
  addProject.appendChild(addButtonImage);
  addProject.addEventListener("click", () => {
    renderProjectForm();
  });

  projectHolder.appendChild(addProject);
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
