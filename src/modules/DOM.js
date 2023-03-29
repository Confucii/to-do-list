import deleteImgSVG from "../images/delete-forever.svg";
import plusSVG from "../images/plus.svg";
import closeSVG from "../images/close.svg";
import Project from "./project";

function cleaner(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
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

function renderOverlay() {
  const bodySelector = document.querySelector("body");

  const overlayDiv = document.createElement("div");
  overlayDiv.classList.add("overlay");

  bodySelector.appendChild(overlayDiv);
}

function deleteOverlay() {
  const overlayDiv = document.querySelector(".overlay");
  overlayDiv.remove();
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

function addProjectForm(projects) {
  const projectForm = document.createElement("form");
  projectForm.classList.add("project-modal-form");

  const projectNameLabel = document.createElement("label");
  projectNameLabel.textContent = "Name";
  projectNameLabel.setAttribute("for", "project-name");

  projectForm.appendChild(projectNameLabel);

  const projectName = document.createElement("input");
  projectName.setAttribute("type", "text");
  projectName.setAttribute("id", "project-name");
  projectName.setAttribute("name", "project-name");
  projectName.setAttribute("minlength", "5");
  projectName.setAttribute("maxlength", "15");
  projectName.required = true;

  projectForm.appendChild(projectName);

  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Add");

  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    projects.push(Project(projectName.value));
    deleteOverlay();
    const modalDiv = document.querySelector(".project-modal");
    modalDiv.remove();
    renderProjects(projects);
  });

  projectForm.appendChild(submitBtn);

  return projectForm;
}

function renderProjectModal(modalClass, formName, form) {
  const bodySelector = document.querySelector("body");

  const modalDiv = document.createElement("div");
  modalDiv.classList.add(`${modalClass}`);

  const modalHeader = document.createElement("div");
  modalHeader.classList.add(`${modalClass}-header`);

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = formName;

  modalHeader.appendChild(modalTitle);

  const modalClose = document.createElement("button");
  modalClose.classList.add(`${modalClass}-close`);

  const modalCloseImg = document.createElement("img");
  modalCloseImg.setAttribute("src", closeSVG);
  modalClose.appendChild(modalCloseImg);

  modalClose.addEventListener("click", () => {
    deleteOverlay();
    modalDiv.remove();
  });

  modalHeader.appendChild(modalClose);

  modalDiv.appendChild(modalHeader);

  modalDiv.appendChild(form);

  bodySelector.appendChild(modalDiv);
}

export function renderAddProjectBtn(projects) {
  const sidebar = document.querySelector(".sidebar");
  const addProject = document.createElement("button");
  addProject.classList.add("add-project-btn");

  const addButtonImage = document.createElement("img");
  addButtonImage.setAttribute("src", plusSVG);
  addProject.appendChild(addButtonImage);

  addProject.addEventListener("click", () => {
    renderOverlay();
    renderProjectModal(
      "project-modal",
      "Add project",
      addProjectForm(projects)
    );
  });

  sidebar.appendChild(addProject);
}

function renderSidebar(projects) {
  const sidebar = document.querySelector(".sidebar");

  const sideTitle = document.createElement("h2");
  sideTitle.textContent = "Targets";
  sidebar.appendChild(sideTitle);

  const projectHolder = document.createElement("div");
  projectHolder.classList.add("projects");
  sidebar.appendChild(projectHolder);
  renderProjects(projects);

  renderAddProjectBtn(projects);
}

export default function renderPage(projects) {
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
  renderSidebar(projects);

  const main = document.createElement("div");
  main.classList.add("main");
  content.appendChild(main);
  renderMainContent(projects[0], 0);
}
